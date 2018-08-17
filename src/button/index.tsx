import './style.scss';

import * as classNames from 'classnames';
import * as React from 'react';

export type ButtonSize = 'small' | 'default' | 'large';
export type ButtonType = 'default' | 'primary' | 'success' | 'danger' | 'warning' | 'info' | 'link';
export type ButtonProps = {
  className?: string;
  size?: ButtonSize;
  type?: ButtonType;
  prefixCls?: string;
};
export type ButtonState = {
  spinning?: boolean;
}

class Button extends React.Component<ButtonProps, ButtonState> {
  static defaultProps = {
    prefixCls: 'dashkit-btn',
    size: 'default' as ButtonSize,
    type: 'default' as ButtonType,
  };

  render() {
    const { children, prefixCls, type, size, className, ...attibutes } = this.props;
    const buttonClassName = classNames(
      prefixCls,
      {
        [`${prefixCls}-${type}`]: true,
        [`${prefixCls}-large`]: size === 'large',
        [`${prefixCls}-small`]: size === 'small',
      },
      className,
    );
    return <button
      {...attibutes}
      className={buttonClassName}
    >
      {children}
    </button>
  }
}
export default Button;
