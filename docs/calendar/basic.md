---
order: 0
title:
  zh-CN: 基本
  en-US: Basic
subtitle:
  zh-CN: 基本用法，可以用`defaultChecked`来定义checkbox默认的值。
  en-US: Use `defaultChecked` to define Checkbox's value.
---

```js
import { Calendar } from 'dashkit-ui';

function onChange(value) {
  console.log(`value: ${value}`);
}

ReactDOM.render(
  <div>
    <div>
      <Calendar onChange={onChange} />
    </div>
    <div style={{marginTop: '10px'}}>
      <Calendar onChange={onChange} type="time" />
    </div>
    <div style={{marginTop: '10px'}}>
      <Calendar onChange={onChange} type="week" format="yyyy Wo" />
    </div>
    <div style={{marginTop: '10px'}}>
      <Calendar onChange={onChange} type="month" />
    </div>
  </div>,
  mountNode
);
```