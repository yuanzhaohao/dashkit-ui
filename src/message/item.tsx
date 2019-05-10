import * as React from 'react';
import Alert from '../alert';
import { MessageItemProps, MessageItemState } from './types';

class MessageItem extends React.PureComponent<MessageItemProps, MessageItemState> {
  public closeTimer: number;

  constructor(props: MessageItemProps) {
    super(props);
    this.closeTimer = 0;
    this.state = {
      dismiss: false,
      closed: false,
    };
  }

  public componentDidMount() {
    this.startCloseTimer();
  }

  public componentDidUpdate(prevProps: MessageItemProps) {
    if (this.props.duration !== prevProps.duration) {
      this.restartCloseTimer();
    }
  }

  public componentWillUnmount() {
    this.clearCloseTimer();
  }

  public close = () => {
    this.clearCloseTimer();
    this.setState({
      dismiss: true,
    });
    setTimeout(() => {
      if (typeof this.props.onClose === 'function') {
        this.props.onClose();
      }
    }, 0);
  };

  public startCloseTimer = () => {
    if (this.props.duration) {
      this.closeTimer = window.setTimeout(() => {
        this.close();
      }, this.props.duration * 1000);
    }
  };

  public clearCloseTimer = () => {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = 0;
    }
  };

  public restartCloseTimer() {
    this.clearCloseTimer();
    this.startCloseTimer();
  }

  public destory = () => {
    this.setState({
      closed: true,
    });
  };

  public render() {
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
