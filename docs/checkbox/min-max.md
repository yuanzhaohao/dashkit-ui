---
order: 4
title:
  zh-CN: 数量的限制
  en-US: Minimum / Maximum
subtitle:
  zh-CN: 使用`min`和`max`能实现最多以及最少选项。
  en-US: The `min` and `max` properties can help you to limit the number of checked items.
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
      <Checkbox.Group
        options={cityOptions}
        value={this.state.checkedCities}
        onChange={this.onGroupChange}
        max={2}
        min={1}
      >
        {cityOptions.map((city, index) =>
          <Checkbox key={index} label={city} />
        )}
      </Checkbox.Group>
    );
  }

  onGroupChange = (value) => {
    const checkedCount = value.length;
    const citiesLength = cityOptions.length;

    this.setState({
      checkedCities: value,
      indeterminate: checkedCount > 0 && checkedCount < citiesLength,
      checkAll: checkedCount === citiesLength,
    });
  }
}

ReactDOM.render(<App />, mountNode);
```