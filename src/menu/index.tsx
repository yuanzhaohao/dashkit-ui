import './style.scss';
import * as classNames from 'classnames';
import * as React from 'react';
import MenuItem from './menu-item';

export type MenuProps = {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  theme?: 'dark' | 'light';
};

class Menu extends React.PureComponent<MenuProps> {
  static Item: any;
  static defaultProps = {
    prefixCls: 'dk-menu',
    theme: 'light',
  };

  render() {
    const {
      children,
      prefixCls,
      style,
      className,
      theme,
    } = this.props;
    const menuClassName = classNames(prefixCls, {
      [`${prefixCls}-dark`]: theme === 'dark',
    }, className);

    return (
      <ul className={menuClassName} style={style}>{children}</ul>
    );
  }
}

Menu.Item = MenuItem;

export default Menu;