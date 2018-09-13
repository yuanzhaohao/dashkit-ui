import './style.scss';

import * as React from 'react';
import * as classNames from 'classnames';
import Icon from '../icon';

export type AlertType = 'default' | 'success' | 'danger' | 'warning' | 'info';

export type AlertProps = {
  prefixCls?: string;
  className?: string;
  type?: AlertType;
  duration?: number;
  closable?: boolean;
  showIcon?: boolean;
  onClose?: React.MouseEventHandler<HTMLAnchorElement>;
};

export type AlertState = {
  dismissed: boolean;
  closed: boolean;
};

class Alert extends React.PureComponent<AlertProps, AlertState> {
  static defaultProps = {
    prefixCls: 'dashkit-alert',
    size: 'default' as AlertType,
  };
  private readonly containerDiv: React.RefObject<HTMLDivElement>;
  constructor(props: AlertProps) {
    super(props);
    this.state = {
      dismissed: false,
      closed: false,
    };
    this.containerDiv = React.createRef();
  }

  public render() {
    const {
      prefixCls,
      className,
      type,
      children,
      closable,
    } = this.props;
    const alertClassName = classNames(
      prefixCls,
      {
        [`${prefixCls}-${type}`]: true,
        [`${prefixCls}-with-close`]: closable,
        [`${prefixCls}-dismissed`]: !!this.state.dismissed,
      },
      className,
    );

    const closeIcon = closable ? (
      <Icon type="x" className={`${prefixCls}-close`} onClick={this.handleClose} />
    ) : null
    return this.state.closed ? null : (
      <div className={alertClassName} ref={this.containerDiv}>
        {children}
        {closeIcon}
      </div>
    );
  }

  private animationEnd = () => {
    this.setState({
      closed: true,
      dismissed: true,
    });
  }

  private handleClose = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const alertElement = this.containerDiv.current;
    if (alertElement) {
      const eventName = getTransitionEvents(alertElement);
      alertElement.addEventListener(eventName, this.animationEnd);
    }
    this.setState({
      dismissed: true,
    });
    const { onClose } = this.props;
    if (typeof onClose === 'function') {
      onClose(e);
    }
  }
}

function getTransitionEvents(element: HTMLElement) {
  const transitions: { [key: string]: string } = {
    'transition': 'transitionend',
    'WebkitTransition': 'webkitTransitionEnd',
    'OTransition': 'oTransitionEnd',
    'MozTransition': 'transitionend',
  }
  Object.keys(transitions).forEach((key: any) => {
    if (element.style[key] !== undefined) {
      return transitions[key];
    }
  });
  return 'transitionend';
}

export default Alert;
