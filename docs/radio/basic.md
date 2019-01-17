---
order: 0
title:
  zh-CN: 基本
  en-US: Basic
subtitle:
  zh-CN: 基本用法，可以用`defaultChecked`来定义radio默认的值。
  en-US: Use `defaultChecked` to define the value of checkbox.
---

```js
import { Radio } from 'dashkit-ui';

function onChange(e) {
  console.log(`change to ${e.target.checked}`)
}

ReactDOM.render(
  <Radio defaultChecked={false} onChange={onChange}>Option</Radio>,
  mountNode
);
```