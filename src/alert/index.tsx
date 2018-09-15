import './style.scss';

import * as React from 'react';
import * as classNames from 'classnames';
import Icon from '../icon';
import { Transition, SvgIcon } from '../utils'

export type AlertType = 'default' | 'success' | 'danger' | 'warning' | 'info';

export type AlertProps = {
  prefixCls?: string;
  className?: string;
  type: AlertType;
  duration?: number;
  closable?: boolean;
  icon?: boolean;
  style?: React.CSSProperties;
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
        [`${prefixCls}-dismissed`]: !!this.state.dismissed,
      },
      className,
    );
    return this.state.closed ? null : (
      <div className={alertClassName} ref={this.containerDiv} style={style}>
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
    console.log('call animationEnd')
    this.setState({
      closed: true,
      dismissed: true,
    });
  }

  handleClose = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // const alertElement = this.containerDiv.current;
    // if (alertElement) {
    //   const eventName = getTransitionEvents(alertElement);
    //   alertElement.addEventListener(eventName, this.animationEnd);
    // }
    console.log('call handleClose')
    this.setState({
      dismissed: true,
    });
    const { onClose } = this.props;
    
    setTimeout(() => {
      this.animationEnd();
      if (typeof onClose === 'function') {
        onClose(e);
      }
    }, 350)
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
