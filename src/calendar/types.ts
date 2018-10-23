export type DateProps = string | number | Date;

export type CalendarMode = 'time' | 'day' | 'month' | 'year';

export type BasicProps = {
  prefixCls?: string;
  className?: string;
  disabled?: boolean;
  value?: DateProps;
  format?: string;
  current: Date;
  onChange: (date: Date, isSelectDay?: boolean) => void;
};

