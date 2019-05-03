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
const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet', 'red1', 'orange1', 'yellow1', 'green1', 'cyan1', 'blue1', 'violet1'];
const stations = {
  'Circle Line': ['Buona Vista', 'Kent Ridge', 'Bishan', 'Dhoby Ghaut'],
  'East West Line': ['Chinese Garden', 'Jurong East'],
};

function onChange(value) {
  console.log(`value: ${value}`);
}

function filterOption(inputValue, itemValue) {
  return itemValue.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1;
}
const Demo = () => (
  <div>
    <Select onChange={onChange}>
      {data.map(color =>
        <Option key={color} value={color} filterOption={filterOption}>{color}</Option>
      )}
      <Option value="disabled" disabled filterOption={filterOption}>disabled</Option>
    </Select>
    <Select onChange={onChange} style={{ marginLeft: 10 }}>
      {Object.keys(stations).map(key =>
        <OptionGroup key={key} label={key}>
          {stations[key].map(station =>
            <Option key={station} value={station} filterOption={filterOption}>{station}</Option>
          )}
        </OptionGroup>
      )}
    </Select>
  </div>
);
ReactDOM.render(
  <Demo />,
  mountNode
);
```