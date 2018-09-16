import './style.scss';

import * as React from 'react';
import * as classNames from 'classnames';
import { AlertType } from '../alert';
import MessageItem from './messageItem';

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

  constructor(props: MessageProps) {
    super(props);

    this.state = {
      messages: [],
    }
  }

  render() {
    const { prefixCls, className } = this.props;
    const { messages } = this.state;
    const messageClassName = classNames(
      prefixCls,
      className,
    );

    return (
      <div className={messageClassName}>
        {messages && messages.length
          ? messages.map(({
            id, type, content,
          }) => (
            <MessageItem
              key={id}
              type={type}
              content={content}
              prefixCls={prefixCls}
              onClose={this.removeMessage.bind(this, id)}
            />
          ))
          : null
        }
      </div>
    );

    // return (
    //   <Animate
    //     className={prefixCls}
    //     transitionName={`${prefixCls}-item`}
    //   >{messageNodes}</Animate>
    // );
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
    const { messages } = this.state;
    const tempMessages = messages.filter(message => message.id !== id);

    if (tempMessages.length === 0) {
      const { onDestory } = this.props;
      if (typeof onDestory === 'function') {
        onDestory();
      }
    } else {
      this.setState({
        messages: tempMessages,
      });
    }
  }
}

export default Message;
