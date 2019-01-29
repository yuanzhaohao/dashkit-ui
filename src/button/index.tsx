import './style.scss';

import * as classNames from 'classnames';
import * as React from 'react';
import Icon from '../icon';

export type ButtonSize = 'small' | 'default' | 'large';
export type ButtonType = 'default' | 'primary' | 'success' | 'danger' | 'warning' | 'info' | 'link';
export type ButtonProps = {
  prefixCls?: string;
  className?: string;
  size?: ButtonSize;
  type?: ButtonType;
  outline?: boolean;
  round?: boolean;
  disabled?: boolean;
  icon?: string;
  loading?: boolean;
} & React.HTMLProps<HTMLButtonElement>;
export type ButtonState = {
  spinning?: boolean;
}

class Button extends React.PureComponent<ButtonProps, ButtonState> {
  static defaultProps = {
    prefixCls: 'dk-btn',
    size: 'default' as ButtonSize,
    type: 'default' as ButtonType,
  };

  render() {
    const {
      children,
      prefixCls,
      type,
      outline,
      round,
      size,
      className,
      disabled,
      icon,
      loading,
      ...attibutes
    } = this.props;
    const buttonClassName = classNames(
      prefixCls,
      {
        [`${prefixCls}-${type}`]: !outline,
        [`${prefixCls}-large`]: size === 'large',
        [`${prefixCls}-small`]: size === 'small',
        [`${prefixCls}-outline-${type}`]: outline,
        [`${prefixCls}-rounded`]: round,
        [`${prefixCls}-icon-only`]: icon && !children,
      },
      className,
    );
    const iconType = loading ? 'loading' : icon;
    const iconNode = iconType && (
      <Icon type={iconType} className={classNames(`${prefixCls}-icon`, {
        [`${prefixCls}-icon-with-child`]: !!children
      })} />
    );

    return (
      <button
        {...attibutes}
        className={buttonClassName}
        disabled={disabled}
      >
        {iconNode}{children}
      </button>
    );
  }
}
export default Button;
