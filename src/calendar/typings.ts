export type DateProps = string | number | Date;

export type CalendarMode = 'time' | 'day' | 'month' | 'year';
export type CalendarType = 'time' | 'day' | 'week' | 'month' | 'year' | 'datetime';

export type PickerChildProps = {
  prefixCls?: string;
  className?: string;
  disabled?: boolean;
  type: CalendarType;
  range?: boolean;
  current: Date;
  format: string;
  value?: DateProps;
  min?: DateProps;
  max?: DateProps;
  rangeDate?: DateProps[];
  hideLeftIcon?: boolean;
  hideRightIcon?: boolean;
  onModeChange: (mode: CalendarMode) => void;
  onChange: (date: DateProps | DateProps[], isSelectDay?: boolean) => void;
};
