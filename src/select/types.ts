export type ValueType = string | number | string[] | number[];
export type SelectSize = 'small' | 'default' | 'large';
export type filterOptionType = (inputValue: string, option?: any) => void;

export type SelectProps = {
  className?: string;
  prefixCls?: string;
  size: SelectSize;
  disabled?: boolean;
  value?: ValueType;
  inputValue?: string;
  multiple?: boolean;
  placeholder?: string;
  onChange?: (options: string[]) => void;
};

export type SelectState = {
  visible: boolean;
  options: ValueType;
  inputValue: string;
  position: {
    top: number;
    left: number;
  },
  width: number;
};

export type SelectOptionProps = {
  prefixCls?: string;
  className?: string;
  value: string | number;
  inputValue: string;
  options?: ValueType;
  disabled?: boolean;
  onRawChange?: (value) => void;
  filterOption: boolean | filterOptionType;
};

export type SelectOptionGroupProps = {
  className: string;
  prefixCls: string;
  label: string;
  key: string | number;
  children: React.ReactChildren | null;
}