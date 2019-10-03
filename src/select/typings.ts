export type ValueType = string | number | string[] | number[];
export type SelectSize = 'small' | 'default' | 'large';

export type SelectProps = {
  className?: string;
  prefixCls?: string;
  size: SelectSize;
  disabled?: boolean;
  name?: string;
  value?: ValueType;
  defaultValue?: ValueType;
  multiple?: boolean;
  placeholder?: string;
  prefix?: string;
  prefixClassName?: string;
  onChange?: (options: ValueType) => void;
};

export type SelectState = {
  visible: boolean;
  options: ValueType;
  inputValue: string;
  position: {
    top: number;
    left: number;
  };
  width: number;
};

export type SelectOptionProps = {
  prefixCls?: string;
  className?: string;
  value: string | number;
  disabled?: boolean;
  filterOption: boolean | ((inputValue: string, option?: any) => void);
};

export type SelectContextProps = SelectOptionProps & {
  options?: ValueType;
  inputValue: string;
  onRawChange?: (value) => void;
};

export type SelectOptionGroupProps = {
  className: string;
  prefixCls: string;
  label: string;
  children: any;
};
