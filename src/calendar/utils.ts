import { DateProps } from './typings';

const token = /d{1,4}|M{1,4}|yy(?:yy)?|S{1,3}|Do|ZZ|WW|Wo|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g;
const twoDigits = /\d\d?/;
const threeDigits = /\d{3}/;
const fourDigits = /\d{4}/;
// tslint:disable-next-line
const word = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;
const literal = /\[([^]*?)\]/gm;
const amPm = ['am', 'pm'];
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export const weekdayValues = {
  short: shorten(weekdays, 3),
  long: weekdays,
};

export const monthValues = {
  short: shorten(months, 3),
  long: months,
};

export const allPlaceholders: { [key: string]: any } = {
  day: 'Select date',
  time: 'Select time',
  week: 'Select week',
  month: 'Select month',
  year: 'Select year',
  datetime: 'Select Datetime',
  range: {
    day: ['Start day', 'End day'],
    time: ['Start time', 'End time'],
    week: ['Start week', 'End week'],
    month: ['Start month', 'End month'],
    year: ['Start year', 'End year'],
    datetime: ['Start time', 'End time'],
  },
};
export const allFormats = {
  day: 'yyyy-MM-dd',
  time: 'HH:mm:ss',
  week: 'yyyy WW',
  month: 'yyyy-MM',
  year: 'yyyy',
  datetime: 'yyyy-MM-dd HH:mm:ss',
};

export function shorten(arr: string[], sLen: number) {
  const newArr = [];
  for (let i = 0, len = arr.length; i < len; i++) {
    newArr.push(arr[i].substr(0, sLen));
  }
  return newArr;
}

export function getDaySuffix(d: number) {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = d % 100;
  return d + (s[(v - 20) % 10] || s[v] || s[0]);
}

export function pad(val: number, len = 2) {
  let newVal = String(val);
  while (newVal.length < len) {
    newVal = '0' + val;
  }
  return newVal;
}

export function toDate(dirtyDate?: DateProps) {
  if (arguments.length < 1) {
    throw new TypeError('1 argument required, but only ' + arguments.length + ' present');
  }

  if (dirtyDate instanceof Date) {
    return new Date(dirtyDate.getTime());
  } else if (
    typeof dirtyDate === 'number' ||
    Object.prototype.toString.call(dirtyDate) === '[object Number]'
  ) {
    return new Date(dirtyDate);
  } else if (
    typeof dirtyDate === 'string' ||
    Object.prototype.toString.call(dirtyDate) === '[object String]'
  ) {
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
  const daysInMonth = getDayNumberOfMouth(dateWithDesiredMonth);
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

export function isDate(dirtyDate?: DateProps) {
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
    throw new TypeError('2 arguments required, but only ' + arguments.length + ' present');
  }

  const dateLeftStartOfDay = startOfDay(dirtyDateLeft);
  const dateRightStartOfDay = startOfDay(dirtyDateRight);

  return dateLeftStartOfDay.getTime() === dateRightStartOfDay.getTime();
}

export function isSameWeek(dirtyDateLeft: DateProps, dirtyDateRight: DateProps) {
  if (arguments.length < 2) {
    throw new TypeError('2 arguments required, but only ' + arguments.length + ' present');
  }

  const dateLeftStartOfWeek = startOfWeek(dirtyDateLeft);
  const dateRightStartOfWeek = startOfWeek(dirtyDateRight);

  return dateLeftStartOfWeek.getTime() === dateRightStartOfWeek.getTime();
}

export function isSameMonth(dirtyDateLeft: DateProps, dirtyDateRight: DateProps) {
  if (arguments.length < 2) {
    throw new TypeError('2 arguments required, but only ' + arguments.length + ' present');
  }

  const dateLeft = toDate(dirtyDateLeft);
  const dateRight = toDate(dirtyDateRight);
  return (
    dateLeft.getFullYear() === dateRight.getFullYear() &&
    dateLeft.getMonth() === dateRight.getMonth()
  );
}

export function isSameYear(dirtyDateLeft: DateProps, dirtyDateRight: DateProps) {
  if (arguments.length < 2) {
    throw new TypeError('2 arguments required, but only ' + arguments.length + ' present');
  }

  const dateLeft = toDate(dirtyDateLeft);
  const dateRight = toDate(dirtyDateRight);
  return dateLeft.getFullYear() === dateRight.getFullYear();
}

export function compareAsc(dirtyDateLeft: DateProps, dirtyDateRight: DateProps) {
  if (arguments.length < 2) {
    throw new TypeError('2 arguments required, but only ' + arguments.length + ' present');
  }

  const dateLeft = toDate(dirtyDateLeft);
  const dateRight = toDate(dirtyDateRight);

  const diff = dateLeft.getTime() - dateRight.getTime();

  if (diff < 0) {
    return -1;
  } else if (diff > 0) {
    return 1;
  } else {
    return diff;
  }
}

export function getDayNumberOfMouth(dirtyDate: DateProps) {
  const date = toDate(dirtyDate);
  const year = date.getFullYear();
  const monthIndex = date.getMonth();
  const lastDayOfMonth = new Date(0);
  lastDayOfMonth.setFullYear(year, monthIndex + 1, 0);
  lastDayOfMonth.setHours(0, 0, 0, 0);
  return lastDayOfMonth.getDate();
}

export function getWeekNumberOfYear(dirtyDate: DateProps) {
  const date = toDate(dirtyDate);
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  const week1 = new Date(date.getFullYear(), 0, 4);
  return (
    1 +
    Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7)
  );
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

const formatFlags: any = {
  D(date: Date) {
    return date.getDay();
  },
  DD(date: Date) {
    return pad(date.getDay());
  },
  Do(date: Date) {
    return getDaySuffix(date.getDate());
  },
  d(date: Date) {
    return date.getDate();
  },
  dd(date: Date) {
    return pad(date.getDate());
  },
  M(date: Date) {
    return date.getMonth() + 1;
  },
  MM(date: Date) {
    return pad(date.getMonth() + 1);
  },
  yy(date: Date) {
    return String(date.getFullYear()).substr(2);
  },
  yyyy(date: Date) {
    return date.getFullYear();
  },
  h(date: Date) {
    return date.getHours() % 12 || 12;
  },
  hh(date: Date) {
    return pad(date.getHours() % 12 || 12);
  },
  H(date: Date) {
    return date.getHours();
  },
  HH(date: Date) {
    return pad(date.getHours());
  },
  m(date: Date) {
    return date.getMinutes();
  },
  mm(date: Date) {
    return pad(date.getMinutes());
  },
  s(date: Date) {
    return date.getSeconds();
  },
  ss(date: Date) {
    return pad(date.getSeconds());
  },
  S(date: Date) {
    return Math.round(date.getMilliseconds() / 100);
  },
  SS(date: Date) {
    return pad(Math.round(date.getMilliseconds() / 10), 2);
  },
  SSS(date: Date) {
    return pad(date.getMilliseconds(), 3);
  },
  a(date: Date) {
    return date.getHours() < 12 ? amPm[0] : amPm[1];
  },
  A(date: Date) {
    return date.getHours() < 12 ? amPm[0].toUpperCase() : amPm[1].toUpperCase();
  },
  WW(date: Date) {
    return pad(getWeekNumberOfYear(date));
  },
  Wo(date: Date) {
    return getDaySuffix(getWeekNumberOfYear(date));
  },
  ZZ(date: Date) {
    const o = date.getTimezoneOffset();
    return (o > 0 ? '-' : '+') + pad(Math.floor(Math.abs(o) / 60) * 100 + (Math.abs(o) % 60), 4);
  },
};

type ParseDataType = { [key: string]: any };
const parseFlags: any = {
  d: [
    twoDigits,
    function(d: ParseDataType, v: number) {
      d.day = v;
    },
  ],
  M: [
    twoDigits,
    function(d: ParseDataType, v: number) {
      d.month = v - 1;
    },
  ],
  h: [
    twoDigits,
    function(d: ParseDataType, v: number) {
      d.hour = v;
    },
  ],
  m: [
    twoDigits,
    function(d: ParseDataType, v: number) {
      d.minute = v;
    },
  ],
  s: [
    twoDigits,
    function(d: ParseDataType, v: number) {
      d.second = v;
    },
  ],
  yy: [
    twoDigits,
    function(d: ParseDataType, v: number) {
      const da = new Date();
      const cent = +('' + da.getFullYear()).substr(0, 2);
      d.year = '' + (v > 68 ? cent - 1 : cent) + v;
    },
  ],
  yyyy: [
    fourDigits,
    function(d: ParseDataType, v: number) {
      d.year = v;
    },
  ],
  S: [
    /\d/,
    function(d: ParseDataType, v: number) {
      d.millisecond = v * 100;
    },
  ],
  SS: [
    /\d{2}/,
    function(d: ParseDataType, v: number) {
      d.millisecond = v * 10;
    },
  ],
  SSS: [
    threeDigits,
    function(d: ParseDataType, v: number) {
      d.millisecond = v;
    },
  ],
  D: [twoDigits],
  ddd: [word],
  a: [
    word,
    function(d: ParseDataType, v: string) {
      const val = v.toLowerCase();
      if (val === amPm[0]) {
        d.isPm = false;
      } else if (val === amPm[1]) {
        d.isPm = true;
      }
    },
  ],
  ZZ: [
    /[\+\-]\d\d:?\d\d/,
    function(d: ParseDataType, v: number) {
      const parts: any = (v + '').match(/([\+\-]|\d\d)/gi);

      if (parts && parts[1]) {
        const minutes = +(parts[1] * 60) + parseInt(parts[2], 10);
        d.timezoneOffset = parts[0] === '+' ? minutes : -minutes;
      }
    },
  ],
};
parseFlags.DD = parseFlags.D;
parseFlags.Do = parseFlags.dd = parseFlags.d;
parseFlags.mm = parseFlags.m;
parseFlags.hh = parseFlags.H = parseFlags.HH = parseFlags.h;
parseFlags.MM = parseFlags.M;
parseFlags.ss = parseFlags.s;
parseFlags.A = parseFlags.a;

export function formatDate(dirtyDate: DateProps, fmt: string) {
  if (arguments.length < 2) {
    throw new TypeError('2 argument required, but only ' + arguments.length + ' present');
  }
  const date = toDate(dirtyDate);
  const literals: any = [];

  fmt = fmt.replace(literal, function($0, $1) {
    literals.push($1);
    return '??';
  });
  fmt = fmt.replace(token, function($0) {
    return $0 in formatFlags ? formatFlags[$0](date) : $0.slice(1, $0.length - 1);
  });
  return fmt.replace(/\?\?/g, function() {
    return literals.shift();
  });
}

export function parseDate(dirtyDateString: string, dirtyFormatString: string) {
  if (arguments.length < 2) {
    throw new TypeError('2 argument required, but only ' + arguments.length + ' present');
  }

  dirtyDateString = String(dirtyDateString);
  dirtyFormatString = String(dirtyFormatString);

  const dateInfo: ParseDataType = {};
  let isValid = true;

  dirtyFormatString.replace(token, function($0) {
    if (parseFlags[$0]) {
      const info = parseFlags[$0];
      const index = dirtyDateString.search(info[0]);
      // tslint:disable-next-line
      if (!~index) {
        isValid = false;
      } else {
        dirtyDateString.replace(info[0], function(result) {
          if (typeof info[1] === 'function') {
            info[1](dateInfo, result);
          }
          dirtyDateString = dirtyDateString.substr(index + result.length);
          return result;
        });
      }
    }

    return parseFlags[$0] ? '' : $0.slice(1, $0.length - 1);
  });

  if (!isValid) {
    return toDate(dirtyFormatString);
  }

  const today = new Date();
  if (dateInfo.isPm === true && dateInfo.hour != null && +dateInfo.hour !== 12) {
    dateInfo.hour = +dateInfo.hour + 12;
  } else if (dateInfo.isPm === false && +dateInfo.hour === 12) {
    dateInfo.hour = 0;
  }

  let date;
  if (dateInfo.timezoneOffset != null) {
    dateInfo.minute = +(dateInfo.minute || 0) - +dateInfo.timezoneOffset;
    date = new Date(
      Date.UTC(
        dateInfo.year || today.getFullYear(),
        dateInfo.month || 0,
        dateInfo.day || 1,
        dateInfo.hour || 0,
        dateInfo.minute || 0,
        dateInfo.second || 0,
        dateInfo.millisecond || 0,
      ),
    );
  } else {
    date = new Date(
      dateInfo.year || today.getFullYear(),
      dateInfo.month || 0,
      dateInfo.day || 1,
      dateInfo.hour || 0,
      dateInfo.minute || 0,
      dateInfo.second || 0,
      dateInfo.millisecond || 0,
    );
  }
  return date;
}
