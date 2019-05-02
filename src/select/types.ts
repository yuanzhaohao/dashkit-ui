export type ValueType = string | number | string[] | number[];
export type SelectSize = 'small' | 'default' | 'large';

export type SelectProps = {
  className?: string;
  prefixCls?: string;
  size: SelectSize;
  disabled?: boolean;
  value?: ValueType;
  inputValue?: string;
  multiple?: boolean;
  onChange?: (options: string[]) => void;
};

export type SelectState = {
  visible: boolean;
  options: ValueType;
  inputValue: string;
  position: {
    top: number;
    left: number;
  }
};

export type SelectOptionProps = {
  prefixCls?: string;
  value: string | number;
  options?: ValueType;
  disabled?: boolean;
  onRawChange?: (value) => void;
};