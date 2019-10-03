---
order: 0
title:
  zh-CN: 基本
  en-US: Basic
subtitle:
  zh-CN: 基本用法。
  en-US: Select component to select value from options.
---

```js
import { Select } from 'dashkit-ui';
const { Option } = Select;
const data = [
  'red',
  'orange',
  'yellow',
  'green',
  'cyan',
  'blue',
  'violet',
  'red1',
  'orange1',
  'yellow1',
  'green1',
  'cyan1',
  'blue1',
  'violet1',
];

function onChange(value) {
  console.log(`value: ${value}`);
}

const Demo = () => (
  <div>
    <Select onChange={onChange}>
      {data.map(color => (
        <Option key={color} value={color}>
          {color}
        </Option>
      ))}
      <Option value="disabled" disabled>
        disabled
      </Option>
    </Select>
    <Select onChange={onChange} defaultValue="orange" style={{ marginLeft: 10 }}>
      {data.map(color => (
        <Option key={color} value={color}>
          {color}
        </Option>
      ))}
    </Select>
    <Select onChange={onChange} disabled style={{ marginLeft: 10 }}>
      {data.map(color => (
        <Option key={color} value={color}>
          {color}
        </Option>
      ))}
    </Select>
  </div>
);

ReactDOM.render(<Demo />, mountNode);
```
