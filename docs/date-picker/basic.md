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
import { DatePicker } from 'dashkit-ui';

function onChange(value) {
  console.log(`value: ${value}`);
}

ReactDOM.render(
  <DatePicker onChange={onChange} />,
  mountNode
);
```