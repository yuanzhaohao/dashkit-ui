import './style.scss';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as classNames from 'classnames';
import Alert, { AlertType } from '../alert';

export type MessageProps = {
  prefixCls?: string;
  className?: string;
  type: AlertType;
  duration?: number;
  closable?: boolean;
  icon?: boolean;
  onClose?: VoidFunction;
};

class MessageItem extends React.PureComponent<MessageProps> {
  static defaultProps = {
    prefixCls: 'dk-msg',
    type: 'default' as AlertType,
    max: 10,
    duration: 3,
  };
  closeTimer: number;

  constructor(props: MessageProps) {
    super(props);
    this.closeTimer = 0;
  }

  componentDidMount() {
    this.startCloseTimer();
  }

  componentDidUpdate(prevProps: MessageProps) {
    if (this.props.duration !== prevProps.duration) {
      this.restartCloseTimer();
    }
  }

  componentWillUnmount() {
    this.clearCloseTimer();
  }

  close = () => {
    this.clearCloseTimer();
    this.props.onClose && this.props.onClose();
  }

  startCloseTimer = () => {
    if (this.props.duration) {
      this.closeTimer = window.setTimeout(() => {
        this.close();
      }, this.props.duration * 1000);
    }
  }

  clearCloseTimer = () => {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = 0;
    }
  }

  restartCloseTimer() {
    this.clearCloseTimer();
    this.startCloseTimer();
  }

  render() {
    const { prefixCls, children } = this.props;

    return (
      <div
        className={`${prefixCls}-item`}
        onMouseEnter={this.clearCloseTimer}
        onMouseLeave={this.startCloseTimer}
      >
        {children}
      </div>
    );
  }
}

export default MessageItem;
