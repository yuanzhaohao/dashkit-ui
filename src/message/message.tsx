import './style.scss';

import * as React from 'react';
import * as classNames from 'classnames';
import { TransitionGroup } from 'react-transition-group';
import MessageItem from './messageItem';
export type MessageType = 'default' | 'success' | 'error' | 'warning' | 'info' | 'loading';

export type MessageProps = {
  prefixCls: string;
  className?: string;
  max: number;
  onDestory?: VoidFunction;
};

export type MessageItemProps = {
  id: string;
  type?: MessageType;
  duration?: number;
  content?: React.ReactNode;
  onClose?: VoidFunction;
};

export type MessageState = {
  messages: MessageItemProps[];
}

class Message extends React.PureComponent<MessageProps, MessageState> {
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
      <TransitionGroup className={messageClassName}>
        {messages && messages.length
          ? messages.map(({
            id, type, content, duration, onClose,
          }) => (
            <MessageItem
              key={id}
              type={type}
              content={content}
              prefixCls={prefixCls}
              duration={duration}
              onClose={() => {
                this.removeMessage(id);
                onClose && onClose();
              }}
            />
          ))
          : null
        }
      </TransitionGroup>
    );
  }

  addMessage = (message: MessageItemProps) => {
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

    this.setState({
      messages: tempMessages,
    });
    // if (tempMessages.length === 0) {
    //   const { onDestory } = this.props;
    //   if (typeof onDestory === 'function') {
    //     onDestory();
    //   }
    // } else {
    //   this.setState({
    //     messages: tempMessages,
    //   });
    // }
  }
}

export default Message;
