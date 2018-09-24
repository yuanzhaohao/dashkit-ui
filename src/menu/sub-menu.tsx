import './style.scss';
import * as classNames from 'classnames';
import * as React from 'react';
import Icon from '../icon';

export type MenuProps = {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  icon?: string | React.ReactNode;
  title?: string;
};

class SubMenu extends React.PureComponent<MenuProps> {
  static Item: any;
  static defaultProps = {
    prefixCls: 'dk-menu-submenu',
    theme: 'light',
  };

  render() {
    const {
      children,
      prefixCls,
      style,
      className,
      icon,
      title,
    } = this.props;
    const subClassName = classNames({
      [`${prefixCls}`]: true,
      [`${prefixCls}-active`]: true,
    }, className);
    const iconNode = icon
      ? typeof icon === 'string'
        ? <Icon type={icon} />
        : icon
      : null;
    const titleClassName = classNames({
      [`${prefixCls}-title`]: true,
    });
    const titleNode = (
      <div className={titleClassName}>
        {iconNode}
        {title}
        <Icon type="chevron-down" className={`${prefixCls}-arrow`} />
      </div>
    );

    return (
      <ul className={subClassName} style={style}>
        {titleNode}
        {children}
      </ul>
    );
  }
}

export default SubMenu;