---
order: 2
title:
  zh-CN: 校验
  en-US: Validation
subtitle:
  zh-CN: 校验，可以用`rule`来定义校验规则。
  en-US: Form component allows you to verify your data, helping you find and correct errors.
---

```js
import { Form, Input, Button, Select, Calendar, Switch, Checkbox, Radio } from 'dashkit-ui';

const cityOptions = ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen'];

class App extends React.Component {
  render() {
    return (
      <Form onSubmit={this.handleSubmit} labelWidth={150}>
        <Form.Item
          label="Name"
          name="name"
          required
          rule={{ message: 'Please input your name', trigger: [`blur`, `change`] }}
        >
          <Input placeholder="Please input your name" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          required
          rule={{ message: 'Please input your email' }}
        >
          <Input placeholder="Please input your email" />
        </Form.Item>
        <Form.Item label="Zone" name="zone" required rule={{ message: 'Please select your zone' }}>
          <Select placeholder="Please select your zone">
            <Select.Option value="zone1">Zone 1</Select.Option>
            <Select.Option value="zone2">Zone 2</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Range Time"
          name="rangTime"
          required
          rule={{ message: 'Please select rang time' }}
        >
          <Calendar type="datetime" range />
        </Form.Item>
        <Form.Item label="Switch" name="switch">
          <Switch />
        </Form.Item>
        <Form.Item
          required
          label="CheckboxGroup"
          name="checkboxGroup"
          rule={{ message: 'Please select your city' }}
        >
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
        <Form.Item
          required
          label="RadioGroup"
          name="radioGroup"
          rule={{ message: 'Please select your radio' }}
        >
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
