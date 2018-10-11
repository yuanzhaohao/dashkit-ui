import { addDays, endOfMonth, endOfWeek, parse, startOfMonth, startOfWeek, toDate } from 'date-fns';
import { ValueProps } from './types';

export const weekdayValues = {
  short: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  long: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
};

export const monthValues = {
  short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  long: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
};

export function getDaysOfMonth(dirtyDate: Date) {
  const date = toDate(dirtyDate);
  const end = endOfWeek(endOfMonth(date));
  let current = startOfWeek(startOfMonth(date));
  current.setHours(dirtyDate.getHours());
  current.setMinutes(dirtyDate.getMinutes());
  current.setSeconds(dirtyDate.getSeconds());

  const days = [];

  while (current.getTime() < end.getTime()) {
    days.push(current);
    current = addDays(current, 1);
  }

  return days;
}

export function isInvalid(date: any) {
  return isNaN(date);
}

export function toDateWithFormat(dirtyDate: ValueProps, fmt: string) {
  if (typeof dirtyDate === 'string') {
    return parse(dirtyDate, fmt, new Date());
  }
  return toDate(dirtyDate);
}

export function cloneTime(date: Date, old: Date, fmt: string) {
  old = toDateWithFormat(old, fmt);
  if (isInvalid(old)) {
    return date;
  }

  date.setHours(old.getHours());
  date.setMinutes(old.getMinutes());
  date.setSeconds(old.getSeconds());

  return date;
}
