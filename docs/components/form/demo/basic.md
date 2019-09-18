---
order: 0
title:
  zh-CN: 基本
  en-US: Basic
subtitle:
  zh-CN: 基本用法，可以用`defaultChecked`来定义checkbox默认的值。
  en-US: It includes all kinds of input items, such as input, select, radio and checkbox.
---

```js
import { Form, Input, Button, Select, Calendar, Switch, Checkbox, Radio } from 'dashkit-ui';

const cityOptions = ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen'];

class App extends React.Component {
  render() {
    console.log(<Form />);
    return (
      <Form onSubmit={this.handleSubmit} labelWidth={150}>
        <Form.Item label="Name" name="name">
          <Input placeholder="Please input your name" />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input placeholder="Please input your email" />
        </Form.Item>
        <Form.Item label="Zone" name="zone">
          <Select placeholder="Please select your zone">
            <Select.Option value="zone1">Zone 1</Select.Option>
            <Select.Option value="zone2">Zone 2</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Date" name="date">
          <Calendar />
        </Form.Item>
        <Form.Item label="Range Time" name="rangTime">
          <Calendar type="datetime" range />
        </Form.Item>
        <Form.Item label="Switch" name="switch">
          <Switch />
        </Form.Item>
        <Form.Item label="CheckboxGroup" name="checkboxGroup">
          <Checkbox.Group options={cityOptions}>
            {cityOptions.map((city, index) => (
              <Checkbox key={index} value={city}>
                {city}
              </Checkbox>
            ))}
          </Checkbox.Group>
        </Form.Item>
        <Form.Item label="Checkbox" name="checkbox">
          <Checkbox>checkbox</Checkbox>
        </Form.Item>
        <Form.Item label="RadioGroup" name="radioGroup">
          <Radio.Group>
            <Radio value={1}>A</Radio>
            <Radio value={2}>B</Radio>
            <Radio value={3}>C</Radio>
            <Radio value={4}>D</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Radio" name="radio">
          <Radio>checkbox</Radio>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button style={{ marginLeft: 10 }} htmlType="reset">
            Reset
          </Button>
        </Form.Item>
      </Form>
    );
  }

  handleSubmit = (event, values, error) => {
    event.preventDefault();

    console.log(values, error);
  };
}

ReactDOM.render(<App />, mountNode);
```
