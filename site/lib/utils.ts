export function formatTime(timestamp: number, format: string) {
  const time = new Date(timestamp);
  const date: { [key: string]: number } = {
    'M+': time.getMonth() + 1,
    'd+': time.getDate(),
    'h+': time.getHours(),
    'm+': time.getMinutes(),
    's+': time.getSeconds(),
    'q+': Math.floor((time.getMonth() + 3) / 3),
    'S+': time.getMilliseconds(),
  };
  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (const k in date) {
    if (new RegExp('(' + k + ')').test(format)) {
      const d = String(date[k]);
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? d : ('00' + d).substr(d.length));
    }
  }
  return format;
}

export function toThousands(num: number) {
  return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
}

const now =
  Date.now ||
  function n() {
    return new Date().getTime();
  };

function later(fn: any, ms: number, context: ObjectConstructor, data: IArguments) {
  const r = setTimeout(function a() {
    fn.apply(context, data);
  }, ms);

  return {
    id: r,
    cancel() {
      clearTimeout(r);
    },
  };
}

/**
 * Function throttle
 * Run the Funtion firstly
 * Run the Function in the time interval.
 */
export function throttle(fn: any, ms: number, context: any) {
  let lastStart = 0;
  let lastEnd = 0;
  let timer: any = 0;
  ms = ms || 150;
  function run() {
    if (timer) {
      timer.cancel();
      timer = 0;
    }
    lastStart = now();
    fn.apply(context, arguments);
    lastEnd = now();
  }
  return function b() {
    if (
      !lastStart ||
      (lastEnd >= lastStart && now() - lastEnd > ms) ||
      (lastEnd < lastStart && now() - lastStart > ms * 8)
    ) {
      run.apply(context, arguments);
    } else {
      if (timer) {
        timer.cancel();
      }
      timer = later(run, ms, context, arguments);
    }
  };
}

export function obj2url(obj: any) {
  if (obj && obj instanceof Object) {
    const ary: any[] = [];
    Object.keys(obj).forEach(key => {
      if (obj[key]) {
        ary.push(`${key}=${obj[key]}`);
      }
    });
    return ary.join('&');
  }
  return '';
}
