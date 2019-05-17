import * as React from 'react';
import * as classNames from 'classnames';
import { MenuItemGroupProps } from './typings';

const MenuItemGroup = (props: Partial<MenuItemGroupProps>) => {
  const { children, prefixCls = 'dk-menu', className, title, ...attributes } = props;
  const groupClassName = classNames(`${prefixCls}-item-group`, className);

  return (
    <>
      <li className={groupClassName} {...attributes}>
        {title}
      </li>
      {children}
    </>
  );
};

export default MenuItemGroup;
