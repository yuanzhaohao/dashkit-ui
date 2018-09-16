import './style.scss';

import * as React from 'react';
import Alert, { AlertType } from '../alert';

export type MessageProps = {
  prefixCls?: string;
  className?: string;
  type: AlertType;
  duration?: number;
  closable?: boolean;
  icon?: boolean;
  content?: React.ReactNode;
  onClose?: VoidFunction;
};

class MessageItem extends React.PureComponent<MessageProps> {
  static defaultProps = {
    duration: 3000,
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
    console.log('call close');
    this.clearCloseTimer();
    this.props.onClose && this.props.onClose();
  }

  startCloseTimer = () => {
    if (this.props.duration) {
      this.closeTimer = window.setTimeout(() => {
        this.close();
      }, this.props.duration);
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
    const { prefixCls, type, content } = this.props;

    return (
      <div
        className={`${prefixCls}-item`}
        onMouseEnter={this.clearCloseTimer}
        onMouseLeave={this.startCloseTimer}
      >
        <Alert
          className={`${prefixCls}-content`}
          onClose={this.close}
          icon
          type={type}
        >
          {content}
        </Alert>
      </div>
    );
  }
}

export default MessageItem;
