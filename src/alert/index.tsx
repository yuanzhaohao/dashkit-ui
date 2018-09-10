import './style.scss';

import * as classNames from 'classnames';
import * as React from 'react';

export type AlertProps = {
  prefixCls?: string;
  className?: string;
  onClose?: React.MouseEventHandler<HTMLButtonElement>;
};

class Alert extends React.PureComponent<AlertProps> {
  static defaultProps = {
    prefixCls: 'dashkit-alert',
  };

  render() {
    const {
      children,
      prefixCls,
      className,
      ...attibutes
    } = this.props;
    const alertClassName = classNames(
      prefixCls,
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
