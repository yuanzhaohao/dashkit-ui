import './style.scss';

import * as classNames from 'classnames';
import * as React from 'react';
import Alert, { AlertType } from '../alert';

export type MessageProps = {
  prefixCls?: string;
  className?: string;
  type?: AlertType;
  onDestory?: VoidFunction;
};
export type MessageState = {
  messages?: { 
    id?: string;
    type?: AlertType;
    content?: React.ReactNode;
  }[];
}

class Message extends React.PureComponent<MessageProps, MessageState> {
  static defaultProps = {
    prefixCls: 'dk-msg',
    type: 'default' as AlertType,
  };

  constructor(props: MessageProps) {
    super(props);

    this.state = {
      messages: [],
    }
  }

  render() {
    const { className, prefixCls } = this.props;
    const messageClassName = classNames(
      prefixCls,
      className,
    );
    const { messages } = this.state;

    if (messages && messages.length) {
      return [
        messages.map(({
          id, type, content,
        }) => (
          <div key={id} className={`${prefixCls}-item`}>
            <Alert
              className={className}
              onClose={this.removeMessage.bind(this, id)}
              icon
              type={type}
            >
              {content}
            </Alert>
          </div>
        ))
      ];
    }
    return null;
  }

  removeMessage = (id: number) => {
    console.log(id);
  }
}
export default Message;
