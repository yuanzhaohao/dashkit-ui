export type SpinSize = 'small' | 'default' | 'large';
export type SpinProps = {
  spinning?: boolean;
  className?: string;
  wrapperClassName?: string;
  size?: SpinSize;
  delay?: number;
  text?: string;
  prefixCls?: string;
};

export type SpinState = {
  spinning?: boolean;
};

export type SpinCircleProps = {
  size?: SpinSize;
  prefixCls?: string;
  className?: string;
};
