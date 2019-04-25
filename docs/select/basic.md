---
order: 0
title:
  zh-CN: 基本
  en-US: Basic
subtitle:
  zh-CN: 基本用法。
  en-US: Select component to select value from options..
---

```js
import { Select } from 'dashkit-ui';
const { Option } = Select;
const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

function onChange(value) {
  console.log(`value: ${value}`);
}

ReactDOM.render(
  <Select>
    {data.map(fruit =>
      <Option value={fruit}>{fruit}</Option>
    )}
  </Select>,
  mountNode
);
```