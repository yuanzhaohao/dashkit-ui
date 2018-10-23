export type DateProps = string | number | Date;

export type CalendarMode = 'time' | 'day' | 'month' | 'year';
export type CalendarType = 'time' | 'day' | 'week' | 'month' | 'year';

export type BasicProps = {
  prefixCls?: string;
  className?: string;
  disabled?: boolean;
  value?: DateProps;
  format: string;
  current: Date;
  type: CalendarType;
  onChange: (date: Date, isSelectDay?: boolean) => void;
};

export type PickerProps = BasicProps & {
  onModeChange: (type: CalendarType) => void;
};
