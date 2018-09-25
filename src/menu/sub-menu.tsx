import './style.scss';
import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import Icon from '../icon';

export type MenuProps = {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  index: string;
  icon?: string;
  title?: string;
};

export type MenuState = {
  active: boolean;
};


class SubMenu extends React.Component<MenuProps, MenuState> {
  static Item: any;
  static defaultProps = {
    prefixCls: 'dk-menu',
    theme: 'light',
  };
  static contextTypes = {
    subMenuHook: PropTypes.object,
  };

  state = {
    active: false,
  };

  render() {
    const { children, prefixCls, style, className, icon, title } = this.props;
    const { active } = this.state;
    const submenuPrefixCls = `${prefixCls}-submenu`;
    const subClassName = classNames({
      [`${submenuPrefixCls}`]: true,
    }, className);
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
      <div className={subClassName} style={style}>
        {titleNode}
        <CSSTransition
          in={active}
          timeout={350}
          onEnter={this.handleEnter}
          onEntered={this.handleEntered}
          onExit={this.handleExit}
          onExiting={this.handleExiting}
          classNames={`${submenuPrefixCls}-list`}
        >
          <ul className={`${submenuPrefixCls}-list`}>{children}</ul>
        </CSSTransition>
      </div>
    );
  }

  handleClick = () => {
    const active = !this.state.active;
    const { index } = this.props;
    this.setState({
      active,
    });
  }

  handleEnter = (el: HTMLDivElement) => {
    if (el.scrollHeight !== 0) {
      el.style.height = el.scrollHeight + 'px';
    }
  }

  handleEntered = (el: HTMLDivElement) => {
    el.style.height = '';
  }

  handleExit = (el: HTMLDivElement) => {
    el.style.height = el.scrollHeight + 'px';
    el.style.overflow = 'hidden';
  }

  handleExiting = (el: HTMLDivElement) => {
    if (el.scrollHeight !== 0) {
      el.style.height = '0';
    }
  }
}

export default SubMenu;