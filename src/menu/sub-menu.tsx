import './style.scss';
import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as classNames from 'classnames';
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
    subMenuHook: PropTypes.object,
  };

  render() {
    const { children, index, prefixCls, className, icon, title, ...attributes } = this.props;
    const { subMenuHook } = this.context;
    const submenuPrefixCls = `${prefixCls}-submenu`;
    const active = subMenuHook.existOpenedMenu(index);

    const iconNode = icon && typeof icon === 'string'
      ? <Icon type={icon} className={`${prefixCls}-icon`} />
      : null;
    const titleNode = (
      <div className={`${submenuPrefixCls}-title`} onClick={this.handleClick}>
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
          [`${submenuPrefixCls}`]: true,
        }, className)}
        {...attributes}
      >
        {titleNode}
        {children
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
              [`${submenuPrefixCls}-list-opened`]: active,
            })}>{children}</ul>
          </CSSTransition>
          : null
        }
      </div>
    );
  }

  handleClick = () => {
    const { subMenuHook } = this.context;

    if (subMenuHook) {
      const { index } = this.props;
      if (!subMenuHook.existOpenedMenu(index)) {
        subMenuHook.addOpenedMenu(index);
      } else {
        subMenuHook.removeOpenedMenu(index);
      }
    }
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