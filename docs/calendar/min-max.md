---
order: 2
title:
  zh-CN: 时间限制
  en-US: Minimum / Maximum
subtitle:
  zh-CN: 使用`min`和`max`能实现时间的控制。
  en-US: The `min` and `max` properties can help you to limit the time.
---

```js
import { Calendar, Grid } from 'dashkit-ui';
import { addDays, addMonths } from 'dashkit-ui/Calendar/utils';
const { Col, Row } = Grid;

function onChange(value) {
  console.log(`value: ${value}`);
}

function getMaxDate() {
  const date = new Date();
  date.setHours(23, 59, 59, 999);
  return addDays(date, 1);
}

function getMinDate() {
  const date = new Date();
  return addMonths(date, -6);
}

ReactDOM.render(
  <div>
    <Calendar onChange={onChange} min={getMinDate()} max={getMaxDate()} type="datetime" range />
  </div>,
  mountNode
);
```