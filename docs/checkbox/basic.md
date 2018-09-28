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
import { Checkbox } from 'dashkit-ui';

function onChange(e) {
  console.log(`change to ${e.target.checked}`)
}

ReactDOM.render(
  <Checkbox defaultChecked onChange={onChange}>Option</Checkbox>,
  mountNode
);
```