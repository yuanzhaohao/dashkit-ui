import './style.scss';
import * as classNames from 'classnames';
import * as React from 'react';
import Icon from '../icon';

export type MenuItemProps = {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  icon?: string | React.ReactNode;
};

class MenuItem extends React.PureComponent<MenuItemProps> {
  static defaultProps = {
    prefixCls: 'dk-menu-item',
    disabled: false,
  };

  render() {
    const {
      children,
      prefixCls,
      style,
      className,
      disabled,
      icon,
    } = this.props;
    const itemClassName = classNames({
      [`${prefixCls}`]: true,
      [`${prefixCls}-disabled`]: disabled,
    }, className);
    const iconNode = icon
      ? typeof icon === 'string'
        ? <Icon type={icon} />
        : icon
      : null;

    return (
      <li className={itemClassName} style={style}>
        {iconNode}
        {children}
      </li>
    );
  }
}

export default MenuItem;