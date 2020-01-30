import * as React from 'react';
import { createPortal, findDOMNode } from 'react-dom';
import * as classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';

export type TooltipPlacement =
  | 'top-start'
  | 'top'
  | 'top-end'
  | 'right-start'
  | 'right'
  | 'right-end'
  | 'bottom-start'
  | 'bottom'
  | 'bottom-end'
  | 'left-start'
  | 'left'
  | 'left-end';
export type TooltipTrigger = 'hover' | 'click' | 'focus';
export type TooltipProps = {
  prefixCls?: string;
  className?: string;
  disabled?: boolean;
  trigger: TooltipTrigger;
  visible?: boolean;
  content: React.ReactNode;
  placement: TooltipPlacement;
};

export type TooltipState = {
  visible: boolean;
  left: number;
  top: number;
};

class Tooltip extends React.PureComponent<TooltipProps, TooltipState> {
  public static defaultProps = {
    prefixCls: 'dk-tooltip',
    placement: 'top' as TooltipPlacement,
    trigger: 'hover' as TooltipTrigger,
  };
  public hoverTimer: number;
  public readonly childRef: React.RefObject<HTMLDivElement>;
  public readonly contentRef: React.RefObject<HTMLDivElement>;

  public static getDerivedStateFromProps(nextProps: TooltipProps) {
    if ('visible' in nextProps) {
      console.log('call visible', nextProps.visible);
      return { visible: !!nextProps.visible };
    }
    return null;
  }

  constructor(props: TooltipProps) {
    super(props);

    this.hoverTimer = 0;
    this.contentRef = React.createRef();
    this.childRef = React.createRef();
    this.state = {
      visible: false,
      left: 0,
      top: 0,
    };
  }

  public render() {
    const {
      children,
      prefixCls,
      disabled,
      content,
      placement,
      trigger,
      visible: visibleProp,
      ...attributes
    } = this.props;
    const tooltopClassName = classNames({
      [prefixCls]: true,
      [`${prefixCls}-${placement}`]: true,
    });
    const { visible, left, top } = this.state;
    const tooltipNode = (
      <CSSTransition
        in={visible}
        timeout={150}
        unmountOnExit
        onEnter={this.handleEnter}
        classNames={`${prefixCls}`}
      >
        <div
          className={tooltopClassName}
          style={{ left, top }}
          onMouseEnter={trigger === 'hover' ? this.handleMouseEnter : undefined}
          onMouseLeave={trigger === 'hover' ? this.handleMouseLeave : undefined}
        >
          <div className={`${prefixCls}-arrow`} />
          <div className={`${prefixCls}-inner`}>{content}</div>
        </div>
      </CSSTransition>
    );
    const childProps = this.getChildProps();

    const childNode = (
      <span className={`${prefixCls}-reference`} {...childProps} {...attributes}>
        {children}
      </span>
    );

    return (
      <>
        {childNode}
        {!disabled && createPortal(tooltipNode, document.body)}
      </>
    );
  }

  public getChildProps = () => {
    const { trigger } = this.props;

    switch (trigger) {
      case 'click': {
        return {
          onClick: this.handleClick,
        };
      }
      case 'focus': {
        return {
          onFocus: this.handleFocus,
          onBlur: this.handleBlur,
        };
      }
      default: {
        return {
          onMouseEnter: this.handleMouseEnter,
          onMouseLeave: this.handleMouseLeave,
        };
      }
    }
  };

  public getPosition = (contentEl: HTMLDivElement) => {
    const { placement } = this.props;
    const el = findDOMNode(this);
    let left = 0;
    let top = 0;

    if (!(el instanceof Element)) {
      return { left, top };
    }
    const rect = el.getBoundingClientRect();
    const contentRect = contentEl.getBoundingClientRect();
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;

    switch (placement) {
      case 'top-start':
        left = scrollLeft + rect.left;
        top = scrollTop + rect.top - contentRect.height;
        break;
      case 'top':
        left = scrollLeft + rect.left + rect.width / 2 - contentRect.width / 2;
        top = scrollTop + rect.top - contentRect.height;
        break;
      case 'top-end':
        left = scrollLeft + rect.left + rect.width - contentRect.width;
        top = scrollTop + rect.top - contentRect.height;
        break;
      case 'right-start':
        left = scrollLeft + rect.right;
        top = scrollTop + rect.top;
        break;
      case 'right':
        left = scrollLeft + rect.right;
        top = scrollTop + rect.top + rect.height / 2 - contentRect.height / 2;
        break;
      case 'right-end':
        left = scrollLeft + rect.right;
        top = scrollTop + rect.bottom - contentRect.height;
        break;
      case 'bottom-start':
        left = scrollLeft + rect.left;
        top = scrollTop + rect.top + rect.height;
        break;
      case 'bottom':
        left = scrollLeft + rect.left + rect.width / 2 - contentRect.width / 2;
        top = scrollTop + rect.top + rect.height;
        break;
      case 'bottom-end':
        left = scrollLeft + rect.left + rect.width - contentRect.width;
        top = scrollTop + rect.top + rect.height;
        break;
      case 'left-start':
        left = scrollLeft + rect.left - contentRect.width;
        top = scrollTop + rect.top;
        break;
      case 'left':
        left = scrollLeft + rect.left - contentRect.width;
        top = scrollTop + rect.top + rect.height / 2 - contentRect.height / 2;
        break;
      case 'left-end':
        left = scrollLeft + rect.left - contentRect.width;
        top = scrollTop + rect.bottom - contentRect.height;
        break;
      default:
    }

    return { left, top };
  };

  public handleEnter = el => {
    const position = this.getPosition(el);
    this.setState(position);
  };

  public handleClick = () => {
    const { visible } = this.state;

    this.setState({
      visible: !visible,
    });
  };

  public handleFocus = () => {
    this.setState({
      visible: true,
    });
  };

  public handleBlur = () => {
    this.setState({
      visible: false,
    });
  };

  public handleMouseEnter = () => {
    window.clearTimeout(this.hoverTimer);
    this.hoverTimer = window.setTimeout(() => {
      this.setState({
        visible: true,
      });
    }, 100);
  };

  public handleMouseLeave = () => {
    window.clearTimeout(this.hoverTimer);
    this.hoverTimer = window.setTimeout(() => {
      this.setState({
        visible: false,
      });
    }, 50);
  };
}

export default Tooltip;
