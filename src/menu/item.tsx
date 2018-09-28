import './style.scss';
import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as classNames from 'classnames';
import Icon from '../icon';

export type MenuItemProps = {
  prefixCls?: string;
  className?: string;
  index: string;
  disabled?: boolean;
  icon?: string;
};

class MenuItem extends React.Component<MenuItemProps> {
  static defaultProps = {
    prefixCls: 'dk-menu',
    disabled: false,
  };

  static contextTypes = {
    itemHook: PropTypes.object,
  };

  render() {
    const { children, prefixCls, className, index, disabled, icon, ...attributes } = this.props;
    const rootState = this.getRootState();
    const itemClassName = classNames({
      [`${prefixCls}-item`]: true,
      [`${prefixCls}-item-active`]: rootState.activeIndex === index,
      [`${prefixCls}-item-disabled`]: disabled,
    }, className);
    const iconNode = icon && typeof icon === 'string'
      ? <Icon type={icon} className={`${prefixCls}-icon`} />
      : null;

    return (
      <li className={itemClassName}
        onClick={disabled ? undefined : this.handleClick}
        {...attributes}
      >
        {iconNode}
        {children}
      </li>
    );
  }

  handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const { itemHook } = this.context;
    if (itemHook) {
      const { index } = this.props;
      itemHook.selectItem(index);
    }
  }

  getRootState = () => {
    if (this.context.itemHook) {
      return this.context.itemHook.getState();
    }

    return {};
  }
}

export default MenuItem;