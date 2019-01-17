import * as React from 'react';
import * as classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import { createPortal } from 'react-dom';
import { createConsumer } from './context';
import { removeClass } from '../utils/dom';
import Icon from '../icon';

export type MenuProps = {
  prefixCls?: string;
  className?: string;
  index: string;
  icon?: string;
  title?: string;
  rootContext: any;
};

export type MenuState = {
  active: boolean;
};

class SubMenu extends React.Component<MenuProps, MenuState> {
  static Item: any;
  static defaultProps = {
    prefixCls: 'dk-menu',
  };
  readonly titleRef: React.RefObject<HTMLDivElement>;
  hoverTimer: number;
  position: { left: number; top: number };

  constructor(props: MenuProps) {
    super(props);

    this.hoverTimer = 0;
    this.titleRef = React.createRef();
    this.position = { left: 0, top: 0 };
    this.state = {
      active: props.rootContext.existOpenedMenu(props.index),
    };
  }

  render() {
    const { children, index, prefixCls, className, icon, title, rootContext, ...attributes } = this.props;
    const opened = rootContext.existOpenedMenu(index);
    const rootProps = rootContext.getProps();
    const isHorizontal = rootProps.mode === 'horizontal';
    const active = isHorizontal ? this.state.active : opened;

    const iconNode = icon && typeof icon === 'string' && (
      <Icon type={icon} className={`${prefixCls}-icon`} />
    );

    const childNode = children && (
      <CSSTransition
        in={active}
        timeout={350}
        onEnter={this.handleEnter}
        onEntered={this.handleEntered}
        onExit={this.handleExit}
        onExiting={this.handleExiting}
        onExited={this.handleExited}
        classNames={`${prefixCls}-submenu-list`}
      >
        <ul
          className={classNames({
            [`${prefixCls}-submenu-list`]: true,
            [`${prefixCls}-dark-submenu-list`]: rootProps.theme === 'dark',
            [`${prefixCls}-horizontal-submenu-list`]: isHorizontal,
            [`${prefixCls}-submenu-list-opened`]: !isHorizontal && opened,
          })}
          style={isHorizontal ? this.position : undefined}
          onMouseEnter={isHorizontal ? this.handleMouseEnter : undefined}
          onMouseLeave={isHorizontal ? this.handleMouseLeave : undefined}
        >
          {children}
        </ul>
      </CSSTransition>
    );
    const titleClassName = classNames({
      [`${prefixCls}-submenu-title`]: true,
      [`${prefixCls}-horizontal-submenu-title`]: isHorizontal,
      [`${prefixCls}-active`]: opened,
    });
    const titleNode = (
      <div
        className={titleClassName}
        onClick={!isHorizontal ? this.handleClick : null}
        onMouseEnter={isHorizontal ? this.handleMouseEnter : null}
        onMouseLeave={isHorizontal ? this.handleMouseLeave : null}
        ref={this.titleRef}
      >
        {iconNode}
        {title}
        <Icon type="chevron-down" className={classNames({
          [`${prefixCls}-arrow`]: true,
          [`${prefixCls}-arrow-active`]: active,
        })} />
      </div>
    );

    return (
      <div
        className={classNames({
          [`${prefixCls}-submenu`]: true,
        }, className)}
        {...attributes}
      >
        {titleNode}
        {!isHorizontal
          ? childNode
          // : createPortal(childNode, document.body)
          : opened
            ? createPortal(childNode, document.body)
            : null
        }
      </div>
    );
  }

  handleClick = () => {
    const { index, rootContext } = this.props;

    if (!rootContext.existOpenedMenu(index)) {
      rootContext.addOpenedMenu(index);
    } else {
      rootContext.removeOpenedMenu(index);
    }
  }

  handleMouseEnter = () => {
    const { index, rootContext } = this.props;

    window.clearTimeout(this.hoverTimer);
    this.hoverTimer = window.setTimeout(() => {
      if (!rootContext.existOpenedMenu(index)) {
        this.position = this.getPosition();
        rootContext.addOpenedMenu(index);
        window.setTimeout(() => {
          this.setState({
            active: true,
          });
        }, 0);
      }
    }, 300);
  }

  handleMouseLeave = () => {
    window.clearTimeout(this.hoverTimer);
    this.hoverTimer = window.setTimeout(() => {
      this.setState({
        active: false,
      });
    }, 300);
  }

  handleEnter = (el) => {
    const { prefixCls } = this.props;
    removeClass(el, `${prefixCls}-submenu-list-opened`);
    if (el.scrollHeight !== 0) {
      el.style.height = el.scrollHeight + 'px';
    }
  }

  handleEntered = (el) => {
    el.style.height = '';
  }

  handleExit = (el) => {
    el.style.height = el.scrollHeight + 'px';
  }

  handleExiting = (el) => {
    if (el.scrollHeight !== 0) {
      el.style.height = '0';
    }
  }

  handleExited = () => {
    const { index, rootContext } = this.props;
    rootContext.removeOpenedMenu(index);
  }

  getPosition = () => {
    const titleDiv = this.titleRef.current;
    let left = 0;
    let top = 0;
    if (titleDiv && document.documentElement) {
      const rect = titleDiv.getBoundingClientRect();
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;

      left = scrollLeft + rect.left;
      top = scrollTop + rect.top + rect.height;
    }

    return {
      left,
      top,
    };
  }
}

export default createConsumer(SubMenu);