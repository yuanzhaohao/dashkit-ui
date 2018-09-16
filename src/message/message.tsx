import './style.scss';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as classNames from 'classnames';
import { AlertType } from '../alert';
import MessageItem from './messageItem';
import Animate from 'rc-animate';

export type MessageProps = {
  prefixCls: string;
  className?: string;
  type: AlertType;
  max: number;
  duration: number;
  onDestory?: VoidFunction;
};

export type MessageItemProps = {
  id?: string;
  type: AlertType;
  content?: React.ReactNode;
};

export type MessageState = {
  messages: MessageItemProps[];
}

let seed = 0;
const now = Date.now();

function getUid() {
  return `dashkit-message-${now}-${seed++}`;
}

class Message extends React.PureComponent<MessageProps, MessageState> {
  static defaultProps = {
    prefixCls: 'dk-msg',
    type: 'default' as AlertType,
    max: 10,
    duration: 3,
  };
  closeTimer: number;

  constructor(props: MessageProps) {
    super(props);

    this.state = {
      messages: [],
    }
    this.closeTimer = 0;
  }

  render() {
    const { prefixCls } = this.props;
    const { messages } = this.state;
    const messageNodes = (
      messages && messages.length
      ? messages.map(({
        id, type, content,
      }) => (
        <MessageItem 
          key={id} 
          prefixCls={prefixCls}
          onClose={this.removeMessage.bind(this, id)}
          icon
          closable
          type={type}
        >
          {content}
        </MessageItem>
      ))
      : null
    );

    // return <div className={prefixCls}>{messageNodes}</div>;

    return (
      <Animate
        className={prefixCls}
        transitionName={`${prefixCls}-item`}
      >{messageNodes}</Animate>
    );
  }

  addMessage = (message: MessageItemProps) => {
    message.id = getUid();
    const { max } = this.props;
    const { messages } = this.state;
    const tempMessages = [...messages, message];
    if (tempMessages.length > max) {
      tempMessages.unshift();
    }

    this.setState({
      messages: tempMessages,
    });
  }

  removeMessage = (id: string) => {
    // const { messages } = this.state;
    // this.setState({
    //   messages: messages.filter(message => message.id !== id)
    // });

    let callback
    const messages = this.state.messages.filter((m) => {
      if (m.id !== id) return true
      if (m.onClose) {
        callback = m.onClose
      }
      return false
    })

    if (messages.length === 0) {
      this.props.onDestory()
    } else {
      this.setState({ messages })
    }

    if (callback) callback()
  }
}

export default Message;
