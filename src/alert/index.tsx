import './style.scss';

import * as React from 'react';
import * as classNames from 'classnames';
import Icon from '../icon';
const svgIcons: any = require('../utils/svg-icon');
// import * as svgIcons from '../utils/svg-icon';

export type AlertType = 'default' | 'success' | 'danger' | 'warning' | 'info';

export type AlertProps = {
  prefixCls?: string;
  className?: string;
  type?: AlertType;
  duration?: number;
  closable?: boolean;
  icon?: boolean;
  onClose?: React.MouseEventHandler<HTMLAnchorElement>;
};

export type AlertState = {
  dismissed: boolean;
  closed: boolean;
};

class Alert extends React.PureComponent<AlertProps, AlertState> {
  static defaultProps = {
    prefixCls: 'dk-alert',
    type: 'default' as AlertType,
  };
  readonly containerDiv: React.RefObject<HTMLDivElement>;
  constructor(props: AlertProps) {
    super(props);
    this.state = {
      dismissed: false,
      closed: false,
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
    } = this.props;
    const iconChild = svgIcons[type || 'default'];
    const isShowIcon = icon && iconChild;
    const alertClassName = classNames(
      prefixCls,
      {
        [`${prefixCls}-${type}`]: true,
        [`${prefixCls}-with-close`]: closable,
        [`${prefixCls}-with-icon`]: isShowIcon,
        [`${prefixCls}-dismissed`]: !!this.state.dismissed,
      },
      className,
    );
    return this.state.closed ? null : (
      <div className={alertClassName} ref={this.containerDiv}>
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
    );
  }

  animationEnd = () => {
    this.setState({
      closed: true,
      dismissed: true,
    });
  }

  handleClose = (e: React.MouseEvent<HTMLAnchorElement>) => {
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
