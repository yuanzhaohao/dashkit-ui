import * as React from 'react';
import Alert from '../alert';
import { MessageItemProps, MessageItemState } from './types';

class MessageItem extends React.PureComponent<MessageItemProps, MessageItemState> {
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
