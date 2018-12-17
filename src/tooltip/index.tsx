import './style.scss';
import * as React from 'react';
import { createPortal, findDOMNode } from 'react-dom';
import * as classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';

export type TooltipTheme = 'dark' | 'light';
export type TooltipPlacement = 'top-start' | 'top' | 'top-end' | 'right-start' | 'right' | 'right-end' | 'bottom-start' | 'bottom' | 'bottom-end' | 'left-start' | 'left' | 'left-end';
export type TooltipTrigger = 'hover' | 'click';
export type TooltipProps = {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  trigger: TooltipTrigger;
  visible?: boolean;
  theme: TooltipTheme;
  content: string;
  placement: TooltipPlacement;
  children: React.ReactElement<any>;
};

export type TooltipState = {
  visible: boolean;
  left: number;
  top: number;
};

class Tooltip extends React.PureComponent<TooltipProps, TooltipState> {
  hoverTimer: number;
  readonly childRef: React.RefObject<HTMLDivElement>;
  readonly contentRef: React.RefObject<HTMLDivElement>;

  static defaultProps = {
    prefixCls: 'dk-tooltip',
    disabled: false,
    theme: 'dark' as TooltipTheme,
    placement: 'top' as TooltipPlacement,
    trigger: 'hover' as TooltipTrigger,
  };

  static getDerivedStateFromProps(nextProps: TooltipProps) {
    if ('visible' in nextProps) {
      return { visible: nextProps.visible };
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

  render() {
    const { children, prefixCls, disabled, content, placement, trigger } = this.props;
    const tooltopClassName = classNames({
      [prefixCls]: true,
      [`${prefixCls}-${placement}`]: true,
    });
    const { visible, left, top } = this.state;
    const tooltipNode = (
      <CSSTransition
        in={visible}
        timeout={216}
        unmountOnExit
        onEnter={this.handleEnter}
        classNames={`${prefixCls}`}
      >
        <div className={tooltopClassName} style={{ left, top }}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          <div className={`${prefixCls}-arrow`}></div>
          <div className={`${prefixCls}-inner`}>{content}</div>
        </div>
      </CSSTransition>
    );
    const childProps = this.getChildProps();

    const childNode = (
      children
        ? children instanceof Array
          ? <div className={`${prefixCls}-reference`} {...childProps}>{children}</div>
          : React.cloneElement(children, childProps)
        : null
    );

    return (
      <>
        {childNode}
        {!disabled && (
          createPortal(tooltipNode, document.body)
        )}
      </>
    );
  }

  getChildProps = () => {
    if (this.props.trigger === 'hover') {
      return {
        onMouseEnter: this.handleMouseEnter,
        onMouseLeave: this.handleMouseLeave,
      }
    }
    return {};
  }

  getPosition = (contentEl: HTMLDivElement) => {
    const { placement } = this.props;

    const el = findDOMNode(this);
    const rect = el.getBoundingClientRect();
    const contentRect = contentEl.getBoundingClientRect();
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;

    let left = 0;
    let top = 0;

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
  }

  handleEnter = (el) => {
    const position = this.getPosition(el);
    this.setState(position);
  }

  handleMouseEnter = () => {
    window.clearTimeout(this.hoverTimer);
    this.hoverTimer = window.setTimeout(() => {
      this.setState({
        visible: true,
      });
    }, 100);
  }

  handleMouseLeave = () => {
    window.clearTimeout(this.hoverTimer);
    this.hoverTimer = window.setTimeout(() => {
      this.setState({
        visible: false,
      });
    }, 50);
  }
}

export default Tooltip;