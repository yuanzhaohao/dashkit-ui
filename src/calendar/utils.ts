import {
  addDays,
  addMonths,
  addSeconds,
  addYears,
  compareAsc,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isSameWeek,
  isValid,
  parse,
  startOfMonth,
  startOfWeek,
  toDate,
} from 'date-fns';

function getDaysOfMonth(dirtyDate: any) {
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

function isInvalid(date: any) {
  return isNaN(date);
}

function toDateWithFormat(dirtyDate: any, fmt: string) {
  let date
  if (typeof dirtyDate === 'string') date = parse(dirtyDate, fmt, new Date())
  else date = toDate(dirtyDate)

  if (isInvalid(date)) date = toDate(dirtyDate)

  return date
}

function compareMonth(dateLeft, dateRight, pad = 0) {
  if (!dateLeft || !dateRight) return 0
  const left = new Date(dateLeft.getFullYear(), dateLeft.getMonth(), 1)
  const right = new Date(dateRight.getFullYear(), dateRight.getMonth() + pad, 1)
  return compareAsc(left, right)
}

function newDate() {
  const date = new Date()
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function cloneTime(date, old, fmt) {
  old = toDateWithFormat(old, fmt)
  if (isInvalid(old)) return date

  date.setHours(old.getHours())
  date.setMinutes(old.getMinutes())
  date.setSeconds(old.getSeconds())

  return date
}

export default {
  addDays,
  addMonths,
  addYears,
  addSeconds,
  cloneTime,
  compareAsc,
  compareMonth,
  getDaysOfMonth,
  format,
  isInvalid,
  isSameDay,
  isSameMonth,
  isSameWeek,
  isValid,
  newDate,
  parse,
  toDate,
  toDateWithFormat,
}
