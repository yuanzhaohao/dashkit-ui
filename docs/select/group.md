---
order: 1
title:
  zh-CN: 组合
  en-US: Group
subtitle:
  zh-CN: 组合用法。
  en-US: Using `OptionGroup` to group the options.
---

```js
import { Select } from 'dashkit-ui';
const { Option, OptionGroup } = Select;
const data = {
  'Circle Line': ['Buona Vista', 'Kent Ridge', 'Bishan', 'Dhoby Ghaut'],
  'East West Line': ['Chinese Garden', 'Jurong East'],
};

function onChange(value) {
  console.log(`value: ${value}`);
}

ReactDOM.render(
  <Select onChange={onChange}>
    {Object.keys(data).map(key =>
      <OptionGroup key={key} label={key}>
        {data[key].map(station =>
          <Option key={station} value={station}>{station}</Option>
        )}
      </OptionGroup>
    )}
  </Select>,
  mountNode
);
```