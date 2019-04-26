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

const Demo = () => (
  <div>
    <Select onChange={onChange}>
      {data.map(fruit =>
        <Option key={fruit} value={fruit}>{fruit}</Option>
      )}
      <Option value="disabled" disabled>disabled</Option>
    </Select>
    <Select onChange={onChange} disabled style={{ marginLeft: 10 }}>
      {data.map(fruit =>
        <Option key={fruit} value={fruit}>{fruit}</Option>
      )}
    </Select>
  </div>
);

ReactDOM.render(
  <Demo />,
  mountNode
);
```