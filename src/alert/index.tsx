import './style.scss';

import * as classNames from 'classnames';
import * as React from 'react';

export type AlertType = 'default' | 'success' | 'danger' | 'warning' | 'info';

export type AlertProps = {
  prefixCls?: string;
  className?: string;
  type?: AlertType;
  onClose?: React.MouseEventHandler<HTMLButtonElement>;
};

class Alert extends React.PureComponent<AlertProps> {
  static defaultProps = {
    prefixCls: 'dashkit-alert',
    size: 'default' as AlertType,
  };

  render() {
    const {
      prefixCls,
      className,
      type,
      children,
      ...attibutes
    } = this.props;
    const alertClassName = classNames(
      prefixCls,
      `${prefixCls}-${type}`,
      className,
    );
    return (
      <div 
        className={alertClassName}
        {...attibutes}
      >
        {children}
      </div>
    );
  }
}
export default Alert;
