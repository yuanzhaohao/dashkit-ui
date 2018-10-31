export type DateProps = string | number | Date;

export type CalendarMode = 'time' | 'day' | 'month' | 'year';
export type CalendarType = 'time' | 'day' | 'week' | 'month' | 'year' | 'datetime';

export type BasicProps = {
  prefixCls?: string;
  className?: string;
  disabled?: boolean;
  value?: DateProps | DateProps[];
  format?: string;
  type: CalendarType;
  range?: boolean;
  rangeDate?: DateProps[];
  onChange: (date: DateProps | DateProps[], isSelectDay?: boolean) => void;
};

export type PickerChildProps = BasicProps & {
  current: Date;
  format: string;
  value?: Date;
  onModeChange: (mode: CalendarMode) => void;
};
