import './style.scss';

import * as classNames from 'classnames';
import * as React from 'react';

export type ButtonSize = 'small' | 'default' | 'large';
export type ButtonType = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link';
export type ButtonProps = {
  className?: string;
  size?: ButtonSize;
  type?: ButtonType;
};
export type ButtonState = {
  spinning?: boolean;
}

class Button extends React.Component<ButtonProps, ButtonState> {
  static defaultProps = {
    size: 'default' as ButtonSize,
    type: 'primary' as ButtonType,
  };

  render() {
    const { children, type, className, ...attibutes } = this.props;
    const buttonClassName = classNames(
      'btn',
      {
        'btn-primary': type === 'primary',
        'btn-secondary': type === 'secondary',
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
