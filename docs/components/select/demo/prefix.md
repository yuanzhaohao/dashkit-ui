---
order: 2
title:
  zh-CN: icon
  en-US: Prefix Icon
subtitle:
  zh-CN: 用prefix设置icon
  en-US: Use `prefix` to set prefix icon.
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
