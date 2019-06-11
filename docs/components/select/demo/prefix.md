---
order: 2
title:
  zh-CN: 选项
  en-US: FilterOption
subtitle:
  zh-CN: 处理选项用法。
  en-US: Use `filterOption` to flilter options.
---

```js
import { Select } from 'dashkit-ui';
const { Option, OptionGroup } = Select;
const stations = {
  'Circle Line': ['Buona Vista', 'Kent Ridge', 'Bishan', 'Dhoby Ghaut'],
  'East West Line': ['Chinese Garden', 'Jurong East'],
};

function onChange(value) {
  console.log(`value: ${value}`);
}
ReactDOM.render(
  <Select onChange={onChange} prefix="map-pin">
    {Object.keys(stations).map(key => (
      <OptionGroup key={key} label={key}>
        {stations[key].map(station => (
          <Option key={station} value={station}>
            {station}
          </Option>
        ))}
      </OptionGroup>
    ))}
  </Select>,
  mountNode,
);
```
