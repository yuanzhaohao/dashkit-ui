import './style.scss';

import * as React from 'react';
import Alert, { AlertType } from '../alert';

export type MessageItemProps = {
  prefixCls?: string;
  className?: string;
  type: AlertType;
  duration?: number;
  closable?: boolean;
  icon?: boolean;
  content?: React.ReactNode;
  onClose?: VoidFunction;
};

export type MessageItemState = {
  dismiss: boolean;
  closed: boolean;
};

class MessageItem extends React.PureComponent<MessageItemProps, MessageItemState> {
  static defaultProps = {
    duration: 3000,
  };
  closeTimer: number;

  constructor(props: MessageItemProps) {
    super(props);
    this.closeTimer = 0;
    this.state = {
      dismiss: false,
      closed: false,
    };
  }

  componentDidMount() {
    this.startCloseTimer();
  }

  componentDidUpdate(prevProps: MessageItemProps) {
    if (this.props.duration !== prevProps.duration) {
      this.restartCloseTimer();
    }
  }

  componentWillUnmount() {
    this.clearCloseTimer();
  }

  close = () => {
    this.clearCloseTimer();
    this.setState({
      dismiss: true,
    });
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

  destory = () => {
    this.setState({
      closed: true,
    });
  }

  render() {
    const { prefixCls, type, content } = this.props;
    const { dismiss, closed } = this.state;

    return closed ? null : (
      <div
        className={`${prefixCls}-item`}
        onMouseEnter={this.clearCloseTimer}
        onMouseLeave={this.startCloseTimer}
      >
        <Alert
          className={`${prefixCls}-content`}
          onClose={this.destory}
          dismiss={dismiss}
          type={type}
          icon
        >
          {content}
        </Alert>
      </div>
    );
  }
}

export default MessageItem;
