import * as React from 'react';
import * as classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import { Icon } from 'dashkit-ui';

export type AlertType = 'default' | 'success' | 'error' | 'warning' | 'info' | 'loading';

export type AlertProps = {
  prefixCls?: string;
  className?: string;
  type?: AlertType;
  closable?: boolean;
  icon?: boolean;
  onClose?: VoidFunction;
  dismiss?: boolean;
};

export type AlertState = {
  dismiss: boolean;
};

class Alert extends React.PureComponent<AlertProps, AlertState> {
  public static defaultProps = {
    prefixCls: 'dk-alert',
    type: 'default' as AlertType,
    closable: false,
    icon: false,
  };
  public static getDerivedStateFromProps(nextProps: AlertProps) {
    if ('dismiss' in nextProps) {
      return {
        dismiss: !!nextProps.dismiss,
      };
    }
    return null;
  }
  constructor(props: AlertProps) {
    super(props);
    this.state = {
      dismiss: false,
    };
  }

  public render() {
    const {
      prefixCls,
      className,
      children,
      closable,
      icon,
      type,
      dismiss: dismissProp,
      ...attributes
    } = this.props;
    const iconType: { [key: string]: string } = {
      success: 'check-circle',
      error: 'x-circle',
      warning: 'alert-circle',
      info: 'info',
    };
    const isShowIcon = icon && iconType[type];
    const alertClassName = classNames(
      prefixCls,
      {
        [`${prefixCls}-${type}`]: true,
        [`${prefixCls}-with-close`]: closable,
        [`${prefixCls}-with-icon`]: isShowIcon,
      },
      className,
    );
    const { dismiss } = this.state;

    return (
      <CSSTransition
        in={!dismiss}
        timeout={216}
        unmountOnExit
        classNames={`${prefixCls}`}
        onExited={this.handleExited}
      >
        <div className={alertClassName} {...attributes}>
          {isShowIcon ? (
            <div className={`${prefixCls}-icon-box`}>
              <Icon type={iconType[type]} className={`${prefixCls}-icon`} />
            </div>
          ) : null}
          {children}
          {closable ? (
            <Icon type="x" className={`${prefixCls}-close`} onClick={this.handleClose} />
          ) : null}
        </div>
      </CSSTransition>
    );
  }

  private handleExited = () => {
    const { onClose } = this.props;
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  private handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    if (this.state.dismiss) {
      return;
    }

    this.setState({
      dismiss: true,
    });
  };
}

export default Alert;
