import './style.scss';

import * as React from 'react';
import * as classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import Icon from '../icon';
import { SvgIcon } from '../utils';

export type AlertType = 'default' | 'success' | 'error' | 'warning' | 'info';

export type AlertProps = {
  prefixCls: string;
  className?: string;
  type: AlertType;
  closable: boolean;
  icon: boolean;
  style?: React.CSSProperties;
  onClose?: VoidFunction;
};

export type AlertState = {
  dismissed: boolean;
};

class Alert extends React.PureComponent<AlertProps, AlertState> {
  static defaultProps = {
    prefixCls: 'dk-alert',
    type: 'default' as AlertType,
    closable: false,
    icon: false,
  };
  readonly containerDiv: React.RefObject<HTMLDivElement>;
  constructor(props: AlertProps) {
    super(props);
    this.state = {
      dismissed: false,
    };
    this.containerDiv = React.createRef();
  }

  render() {
    const {
      prefixCls,
      className,
      children,
      closable,
      icon,
      type,
      style,
    } = this.props;
    const iconChild = SvgIcon[type];
    const isShowIcon = icon && iconChild;
    const alertClassName = classNames(
      prefixCls,
      {
        [`${prefixCls}-${type}`]: true,
        [`${prefixCls}-with-close`]: closable,
        [`${prefixCls}-with-icon`]: isShowIcon,
      },
      className,
    );

    return (
      <CSSTransition
        in={!this.state.dismissed}
        timeout={216}
        unmountOnExit
        classNames={`${prefixCls}`}
        onExited={this.onAnimationEnd}
      >
        <div className={alertClassName} style={style}>
          {isShowIcon
            ? (
              <div className={`${prefixCls}-icon`}>{iconChild}</div>
            )
            : null
          }
          {children}
          {closable
            ? (
              <Icon type="x" className={`${prefixCls}-close`} onClick={this.handleClose} />
            )
            : null
          }
        </div>
      </CSSTransition>
    );
  }

  onAnimationEnd = () => {
    const { onClose } = this.props;
    if (typeof onClose === 'function') {
      onClose();
    }
  }

  handleClose = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (this.state.dismissed) {
      return;
    }

    this.setState({
      dismissed: true,
    });
  }
}

export default Alert;
