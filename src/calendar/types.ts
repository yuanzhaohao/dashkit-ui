export type ValueProps = string | number | Date;

export type PickerProps = {
  prefixCls?: string;
  className?: string;
  disabled?: boolean;
  value?: ValueProps;
  format?: string;
};

