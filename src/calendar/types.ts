export type DateProps = string | number | Date;

export type CalendarMode = 'time' | 'day' | 'month' | 'year';
export type CalendarType = 'time' | 'day' | 'week' | 'month' | 'year' | 'datetime';

export type BasicProps = {
  className?: string;
  prefixCls?: string;
  disabled?: boolean;
  value?: DateProps;
  format?: string;
  type?: CalendarType;
  onChange: (date: Date, isSelectDay?: boolean) => void;
};

export type PickerProps = BasicProps & {
  type: CalendarType;
  format: string;
  current: Date;
  onModeChange: (type: CalendarType) => void;
};
