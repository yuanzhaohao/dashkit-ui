export type MessageType = 'default' | 'success' | 'error' | 'warning' | 'info' | 'loading';

export type MessageProps = {
  prefixCls?: string;
  max: number;
  onDestory?: VoidFunction;
  transitionDuration: number;
};

export type MessageItemProps = {
  id?: string;
  prefixCls?: string;
  type: MessageType;
  duration?: number;
  content?: React.ReactNode;
  onClose?: VoidFunction;
};

export type MessageState = {
  messages: MessageItemProps[];
};

export type MessageItemState = {
  dismiss: boolean;
  closed: boolean;
};
