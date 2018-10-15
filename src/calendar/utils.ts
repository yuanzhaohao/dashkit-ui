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

export function toDate(dirtyDate: DateProps) {
  if (arguments.length < 1) {
    throw new TypeError(
      '1 argument required, but only ' + arguments.length + ' present',
    );
  }

  if (dirtyDate instanceof Date) {
    return new Date(dirtyDate.getTime());
  } else if (typeof dirtyDate === 'number') {
    return new Date(dirtyDate);
  } else if (typeof dirtyDate === 'string') {
    return new Date(dirtyDate);
  }

  return new Date(NaN);
}

export function addDays(dirtyDate: DateProps, amount: number) {
  amount = Number(amount);
  const date = toDate(dirtyDate);
  date.setDate(date.getDate() + amount);
  return date;
}

export function addMonths(dirtyDate: DateProps, amount: number) {
  amount = Number(amount);
  const date = toDate(dirtyDate);
  const desiredMonth = date.getMonth() + amount;
  const dateWithDesiredMonth = new Date(0);
  dateWithDesiredMonth.setFullYear(date.getFullYear(), desiredMonth, 1);
  dateWithDesiredMonth.setHours(0, 0, 0, 0);
  const daysInMonth = getTotalDaysOfMouth(dateWithDesiredMonth);
  date.setMonth(desiredMonth, Math.min(daysInMonth, date.getDate()));
  return date;
}

export function addYears(dirtyDate: DateProps, amount: number) {
  amount = Number(amount);
  return addMonths(dirtyDate, amount * 12);
}

export function endOfWeek(dirtyDate: DateProps) {
  const date = toDate(dirtyDate);
  const day = date.getDay();
  const diff = 6 - day;

  date.setDate(date.getDate() + diff);
  date.setHours(23, 59, 59, 999);
  return date;
}

export function endOfMonth(dirtyDate: DateProps) {
  const date = toDate(dirtyDate);
  const month = date.getMonth();
  date.setFullYear(date.getFullYear(), month + 1, 0);
  date.setHours(23, 59, 59, 999);
  return date;
}

export function startOfDay(dirtyDate: DateProps) {
  const date = toDate(dirtyDate);
  date.setHours(0, 0, 0, 0);
  return date;
}

export function startOfMonth(dirtyDate: DateProps) {
  const date = toDate(dirtyDate);
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
  return date;
}

export function startOfWeek(dirtyDate: DateProps) {
  const date = toDate(dirtyDate);
  const day = date.getDay();
  const diff = day;

  date.setDate(date.getDate() - diff);
  date.setHours(0, 0, 0, 0);
  return date;
}

export function isDate(dirtyDate: DateProps) {
  if (dirtyDate === null || dirtyDate === undefined) {
    return false;
  }
  if (isNaN(new Date(dirtyDate).getTime())) {
    return false;
  }
  if (Array.isArray(dirtyDate)) {
    // deal with `new Date([ new Date() ]) -> new Date()`
    return false;
  }
  return true;
}

export function isSameDay(dirtyDateLeft: DateProps, dirtyDateRight: DateProps) {
  if (arguments.length < 2) {
    throw new TypeError(
      '2 arguments required, but only ' + arguments.length + ' present',
    );
  }

  const dateLeftStartOfDay = startOfDay(dirtyDateLeft);
  const dateRightStartOfDay = startOfDay(dirtyDateRight);

  return dateLeftStartOfDay.getTime() === dateRightStartOfDay.getTime();
}

export function isSameWeek(
  dirtyDateLeft: DateProps,
  dirtyDateRight: DateProps,
) {
  if (arguments.length < 2) {
    throw new TypeError(
      '2 arguments required, but only ' + arguments.length + ' present',
    );
  }

  const dateLeftStartOfWeek = startOfWeek(dirtyDateLeft);
  const dateRightStartOfWeek = startOfWeek(dirtyDateRight);

  return dateLeftStartOfWeek.getTime() === dateRightStartOfWeek.getTime();
}

export function isSameMonth(
  dirtyDateLeft: DateProps,
  dirtyDateRight: DateProps,
) {
  if (arguments.length < 2) {
    throw new TypeError(
      '2 arguments required, but only ' + arguments.length + ' present',
    );
  }

  const dateLeft = toDate(dirtyDateLeft);
  const dateRight = toDate(dirtyDateRight);
  return (
    dateLeft.getFullYear() === dateRight.getFullYear() &&
    dateLeft.getMonth() === dateRight.getMonth()
  );
}

export function getTotalDaysOfMouth(dirtyDate: DateProps) {
  const date = toDate(dirtyDate);
  const year = date.getFullYear();
  const monthIndex = date.getMonth();
  const lastDayOfMonth = new Date(0);
  lastDayOfMonth.setFullYear(year, monthIndex + 1, 0);
  lastDayOfMonth.setHours(0, 0, 0, 0);
  return lastDayOfMonth.getDate();
}

export function prevMonth(dirtyDate: DateProps) {
  return addMonths(dirtyDate, -1);
}

export function nextMonth(dirtyDate: DateProps) {
  return addMonths(dirtyDate, 1);
}

export function prevYear(dirtyDate: DateProps) {
  return addMonths(dirtyDate, -12);
}

export function nextYear(dirtyDate: DateProps) {
  return addMonths(dirtyDate, 12);
}

export function getDaysOfMonth(dirtyDate: DateProps) {
  const date = toDate(dirtyDate);
  const end = endOfWeek(endOfMonth(date));
  let current = startOfWeek(startOfMonth(date));
  current.setHours(date.getHours());
  current.setMinutes(date.getMinutes());
  current.setSeconds(date.getSeconds());

  const days = [];

  while (current.getTime() < end.getTime()) {
    days.push(current);
    current = addDays(current, 1);
  }

  return days;
}

export function toDateWithFormat(dirtyDate: DateProps, fmt: string) {
  if (typeof dirtyDate === 'string') {
    return parse(dirtyDate, fmt, new Date());
  }
  return toDate(dirtyDate);
}

