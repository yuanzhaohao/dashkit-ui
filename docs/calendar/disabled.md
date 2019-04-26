---
order: 3
title:
  zh-CN: 禁用
  en-US: Disabled
subtitle:
  zh-CN: 使用`disabled`禁用时间选择器。
  en-US: The `disabled` can help you to disable the Calendar.
---

```js
import { Calendar } from 'dashkit-ui';
import { addDays, addMonths } from 'dashkit-ui/Calendar/utils';

function onChange(value) {
  console.log(`value: ${value}`);
}

const Demo = () => (
  <div>
    <Calendar onChange={onChange} disabled />
    <Calendar
      onChange={onChange}
      type="datetime"
      range
      disabled
      style={{ marginTop: 10 }}
    />
  </div>
);

ReactDOM.render(
  <Demo />,
  mountNode
);
```