import * as React from 'react';
import * as classNames from 'classnames';
import { createConsumer } from './context';

export type MenuItemGroupProps = {
  prefixCls?: string;
  className?: string;
  title?: string;
  rootContext: any;
};

class MenuItemGroup extends React.Component<MenuItemGroupProps> {
  public static defaultProps = {
    prefixCls: 'dk-menu',
    disabled: false,
  };

  public render() {
    const { children, prefixCls, className, title, rootContext, ...attributes } = this.props;
    const groupClassName = classNames(
      {
        [`${prefixCls}-item-group`]: true,
      },
      className,
    );

    return (
      <>
        <li className={groupClassName} {...attributes}>
          {title}
        </li>
        {children}
      </>
    );
  }
}

export default createConsumer(MenuItemGroup);
