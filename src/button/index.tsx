import './style.scss';

import * as classNames from 'classnames';
import * as React from 'react';

export type ButtonSize = 'small' | 'default' | 'large';
export type ButtonType = 'default' | 'primary' | 'success' | 'danger' | 'warning' | 'info' | 'link';
export type ButtonProps = {
  prefixCls?: string;
  className?: string;
  size?: ButtonSize;
  type?: ButtonType;
  outline?: boolean;
  round?: boolean;
};
export type ButtonState = {
  spinning?: boolean;
}

class Button extends React.Component<ButtonProps, ButtonState> {
  static defaultProps = {
    prefixCls: 'dashkit-btn',
    outline: false,
    round: false,
    size: 'default' as ButtonSize,
    type: 'default' as ButtonType,
  };

  render() {
    const { children, prefixCls, type, outline, round, size, className, ...attibutes } = this.props;
    const buttonClassName = classNames(
      prefixCls,
      {
        [`${prefixCls}-${type}`]: !outline && true,
        [`${prefixCls}-large`]: size === 'large',
        [`${prefixCls}-small`]: size === 'small',
        [`${prefixCls}-outline-${type}`]: outline,
        [`${prefixCls}-rounded`]: round,
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
