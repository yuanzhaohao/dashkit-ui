import * as React from 'react';
import * as classNames from 'classnames';
import * as PropTyps from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import { removeClass } from '../utils/dom';
import Icon from '../icon';

export type MenuProps = {
  prefixCls?: string;
  className?: string;
  index: string;
  icon?: string;
  title?: string;
};

class SubMenu extends React.Component<MenuProps> {
  static Item: any;
  static defaultProps = {
    prefixCls: 'dk-menu',
    theme: 'light',
  };
  static contextTypes = {
    subMenuHook: PropTyps.object,
  };

  hoverTimer: number;

  constructor(props: MenuProps) {
    super(props);

    this.hoverTimer = 0;
  }

  render() {
    const { children, index, prefixCls, className, icon, title, ...attributes } = this.props;
    const { subMenuHook } = this.context;
    const submenuPrefixCls = `${prefixCls}-submenu`;
    const active = subMenuHook.existOpenedMenu(index);
    const isHorizontal = subMenuHook.getProps().mode === 'horizontal';

    const iconNode = icon && typeof icon === 'string'
      ? <Icon type={icon} className={`${prefixCls}-icon`} />
      : null;

    const childNode = (
      children
        ? <CSSTransition
          in={active}
          timeout={350}
          onEnter={this.handleEnter}
          onEntered={this.handleEntered}
          onExit={this.handleExit}
          onExiting={this.handleExiting}
          classNames={`${submenuPrefixCls}-list`}
        >
          <ul className={classNames({
            [`${submenuPrefixCls}-list`]: true,
            [`${submenuPrefixCls}-list-opened`]: !isHorizontal && active,
          })}>{children}</ul>
        </CSSTransition>
        : null
    );
    const titleClassName = classNames({
      [`${submenuPrefixCls}-title`]: true,
      [`${prefixCls}-active`]: active,
    });
    const titleNode = (
      <div
        className={titleClassName}
        onClick={!isHorizontal ? this.handleClick : null}
        onMouseEnter={isHorizontal ? this.handleMouseEnter : null}
        onMouseLeave={isHorizontal ? this.handleMouseLeave : null}
      >
        {iconNode}
        {title}
        <Icon type="chevron-down" className={classNames({
          [`${prefixCls}-arrow`]: true,
          [`${prefixCls}-arrow-active`]: active,
        })} />
        {isHorizontal ? childNode : null}
      </div>
    );

    return (
      <div
        className={classNames({
          [`${submenuPrefixCls}`]: true,
        }, className)}
        {...attributes}
      >
        {titleNode}
        {!isHorizontal ? childNode : null}
      </div>
    );
  }

  handleClick = () => {
    const { subMenuHook } = this.context;
    const { index } = this.props;

    if (!subMenuHook.existOpenedMenu(index)) {
      subMenuHook.addOpenedMenu(index);
    } else {
      subMenuHook.removeOpenedMenu(index);
    }
  }

  handleMouseEnter = () => {
    console.log('handleMouseEnter')
    const { subMenuHook } = this.context;
    const { index } = this.props;

    clearTimeout(this.hoverTimer);
    this.hoverTimer = window.setTimeout(() => {
      if (!subMenuHook.existOpenedMenu(index)) {
        console.log('open menu')
        subMenuHook.addOpenedMenu(index);
      }
    }, 300);
  }

  handleMouseLeave = () => {
    const { subMenuHook } = this.context;
    const { index } = this.props;

    clearTimeout(this.hoverTimer);
    this.hoverTimer = window.setTimeout(() => {
      subMenuHook.removeOpenedMenu(index);
    }, 300);
  }

  handleEnter = (el: HTMLDivElement) => {
    const { prefixCls } = this.props;
    removeClass(el, `${prefixCls}-submenu-list-opened`);
    if (el.scrollHeight !== 0) {
      el.style.height = el.scrollHeight + 'px';
    }
  }

  handleEntered = (el: HTMLDivElement) => {
    el.style.height = '';
  }

  handleExit = (el: HTMLDivElement) => {
    el.style.height = el.scrollHeight + 'px';
  }

  handleExiting = (el: HTMLDivElement) => {
    if (el.scrollHeight !== 0) {
      el.style.height = '0';
    }
  }

  getRootState = () => {
    if (this.context.subMenuHook) {
      return this.context.subMenuHook.getState();
    }
    return {};
  }
}

export default SubMenu;