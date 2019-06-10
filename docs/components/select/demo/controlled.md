---
order: 4
title:
  zh-CN: 受控组件
  en-US: Controlled Component
subtitle:
  zh-CN: 受控组件
  en-US: Controlled Component.
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

function filterOption(inputValue, itemValue) {
  return itemValue.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1;
}

class Demo extends React.Component {
  state = {
    activeStation: '',
  };
  render() {
    const { activeStation } = this.state;
    return (
      <Select onChange={onChange} value={activeStation} onChange={this.handleChange}>
        {Object.keys(stations).map(key => (
          <OptionGroup key={key} label={key}>
            {stations[key].map(station => (
              <Option key={station} value={station} filterOption={filterOption}>
                {station}
              </Option>
            ))}
          </OptionGroup>
        ))}
      </Select>
    );
  }

  handleChange = value => {
    console.log(value);
    this.setState({
      activeStation: value,
    });
  };
}
ReactDOM.render(<Demo />, mountNode);
```
