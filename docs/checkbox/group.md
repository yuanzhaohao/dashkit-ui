---
order: 3
title:
  zh-CN: 多选框组
  en-US: Checkbox Group
subtitle:
  zh-CN: 适用于多个勾选框绑定到同一个数组的情景，通过是否勾选来表示这一组选项中选中的项。
  en-US: It is used for multiple checkboxes which are bound in one group, and indicates whether one option is selected by checking if it is checked.
---

```js
import { Checkbox } from 'dashkit-ui';

const cityOptions = ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen'];

class App extends React.Component {
  state = {
    checkedCities: cityOptions.slice(0, 2),
    indeterminate: true,
    checkAll: false,
  };

  render() {
    return (
      <div>
        <div className="checkbox-checkall">
          <Checkbox
            indeterminate={this.state.indeterminate}
            onChange={this.onCheckAllChange}
            checked={this.state.checkAll}
          >
            Check all
          </Checkbox>
        </div>
        <br />
        <Checkbox.Group
          options={cityOptions}
          value={this.state.checkedCities}
          onChange={this.onGroupChange}
        >
          {cityOptions.map((city, index) =>
            <Checkbox key={index} value={city}>{city}</Checkbox>
          )}
        </Checkbox.Group>
      </div>
    );
  }

  onGroupChange = (value) => {
    const checkedCount = value.length;
    const citiesLength = cityOptions.length;
    console.log(value);

    this.setState({
      checkedCities: value,
      indeterminate: checkedCount > 0 && checkedCount < citiesLength,
      checkAll: checkedCount === citiesLength,
    });
  }

  onCheckAllChange = (e) => {
    const { checked } = e.target;
    const checkedCities = checked ? cityOptions : [];

    this.setState({
      checkedCities,
      indeterminate: false,
      checkAll: checked,
    });
  }
}

ReactDOM.render(<App />, mountNode);
```