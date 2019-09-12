---
order: 3
title:
  zh-CN: 自定义校验规则
  en-US: Custom validation rules
subtitle:
  zh-CN: 自定义校验规则
  en-US: Custom validation rules.
---

```js
import { Form, Input, Button, Select, Calendar, Switch, Checkbox, Radio } from 'dashkit-ui';

class App extends React.Component {
  render() {
    return (
      <Form onSubmit={this.handleSubmit} labelWidth={150}>
        <Form.Item
          label="Full Name"
          name="name"
          required
          rule={{ message: 'Please input your name', trigger: [`blur`, `change`] }}
        >
          <Input placeholder="Full name" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          required
          rule={{ message: 'Please input your email' }}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          label="Confirm Email"
          name="confirmEmail"
          required
          rule={{
            message: 'Please input your email',
            trigger: [`focus`, `change`],
            validator: this.handleValidator,
          }}
        >
          <Input placeholder="Confirm email" />
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

  handleValidator = (forms, value, callback) => {
    console.log('call handleValidator', value, forms.email, forms);
    if (value !== forms.email) {
      callback("Two inputs don't match!");
    }
  };
}

ReactDOM.render(<App />, mountNode);
```
