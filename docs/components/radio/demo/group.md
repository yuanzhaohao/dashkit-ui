---
order: 3
title:
  zh-CN: 单选框组
  en-US: Radio Group
subtitle:
  zh-CN: 适用于在多个互斥的选项中选择的场景。
  en-US: Suitable for choosing from some mutually exclusive options.
---

```js
import { Radio } from 'dashkit-ui';
const RadioGroup = Radio.Group;

class App extends React.Component {
  state = {
    value: 1,
  };

  render() {
    const { value } = this.state;
    return (
      <RadioGroup onChange={this.handleChange} value={value}>
        <Radio value={1}>A</Radio>
        <Radio value={2}>B</Radio>
        <Radio value={3}>C</Radio>
        <Radio value={4}>D</Radio>
      </RadioGroup>
    );
  }

  handleChange = value => {
    console.log(`value`, value);
    this.setState({ value });
  };
}

ReactDOM.render(<App />, mountNode);
```
