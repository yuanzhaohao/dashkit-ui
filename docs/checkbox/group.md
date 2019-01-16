---
order: 3
title:
  zh-CN: 全选
  en-US: Group
subtitle:
  zh-CN: 在实现全选效果时，你可能会用到 `indeterminate` 属性。
  en-US: The `indeterminate` property can help you to achieve a 'check all' effect.
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
            <Checkbox key={index} label={city} />
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