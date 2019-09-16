import * as classNames from 'classnames';
import * as React from 'react';
import Icon from '../icon';

export type ButtonSize = 'small' | 'default' | 'large';
export type ButtonHtmlType = 'submit' | 'button' | 'reset';
export type ButtonType = 'default' | 'primary' | 'success' | 'danger' | 'warning' | 'info' | 'link';
export type ButtonProps = {
  prefixCls?: string;
  className?: string;
  size?: ButtonSize;
  type?: ButtonType;
  htmlType?: ButtonHtmlType;
  outline?: boolean;
  round?: boolean;
  disabled?: boolean;
  icon?: string;
  loading?: boolean;
  onClick?: React.MouseEventHandler<any>;
};
export type ButtonState = {
  spinning?: boolean;
};

class Button extends React.PureComponent<ButtonProps, ButtonState> {
  private static defaultProps = {
    prefixCls: 'dk-btn',
    size: 'default' as ButtonSize,
    type: 'default' as ButtonType,
    htmlType: 'button' as ButtonHtmlType,
  };

  public render() {
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
      htmlType,
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
    const iconNode = !!icon && (
      <Icon
        type={icon}
        className={classNames(`${prefixCls}-icon`, {
          [`${prefixCls}-icon-with-child`]: !!children,
        })}
      />
    );
    const loadingNode = !!loading && (
      <div
        className={classNames(`${prefixCls}-loading`, {
          [`${prefixCls}-loading-default`]: type === 'default',
          [`${prefixCls}-loading-large`]: size === 'large',
          [`${prefixCls}-loading-small`]: size === 'small',
          [`${prefixCls}-loading-with-child`]: !!children,
        })}
      />
    );

    return (
      <button
        {...attibutes}
        type={htmlType}
        className={buttonClassName}
        disabled={disabled || loading}
      >
        {iconNode}
        {loadingNode}
        {children}
      </button>
    );
  }
}
export default Button;
