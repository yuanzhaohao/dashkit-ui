import * as React from 'react';
import { TransitionGroup } from 'react-transition-group';
import MessageItem from './item';
import { MessageProps, MessageState, MessageItemProps } from './types';

class Message extends React.PureComponent<MessageProps, MessageState> {
  constructor(props: MessageProps) {
    super(props);

    this.state = {
      messages: [],
    }
  }

  render() {
    const { prefixCls } = this.props;
    const { messages } = this.state;

    return (
      <TransitionGroup className={prefixCls}>
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

  removeMessage = (id?: string) => {
    const { transitionDuration, onDestory } = this.props;
    const { messages } = this.state;
    const tempMessages = messages.filter(message => message.id !== id);

    this.setState({
      messages: tempMessages,
    });

    // if (tempMessages.length === 0) {
    //   setTimeout(() => {
    //     if (typeof onDestory === 'function') {
    //       if (window.requestAnimationFrame) {
    //         window.requestAnimationFrame(() => {
    //           onDestory();
    //         });
    //       } else {
    //         onDestory();
    //       }
    //     }
    //   }, transitionDuration * 1000);
    // }
  }
}

export default Message;
