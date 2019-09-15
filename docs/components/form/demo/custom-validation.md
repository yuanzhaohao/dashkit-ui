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
import {
  Form,
  Input,
  Button,
  Select,
  Calendar,
  Switch,
  Checkbox,
  Radio,
  Message,
} from 'dashkit-ui';

class App extends React.Component {
  render() {
    return (
      <Form onSubmit={this.handleSubmit} labelWidth={150}>
        <Form.Item
          label="Full Name"
          name="name"
          required
          rule={{
            message: 'Please input your name',
            trigger: [`blur`, `change`],
            validator: this.handleNameValidator,
          }}
        >
          <Input placeholder="Full name" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          required
          rule={{
            message: 'Please input your email',
            validator: this.handleEmailValidator,
          }}
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
            validator: this.handleConfirmValidator,
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

  handleSubmit = (event, values, errors, forms) => {
    event.preventDefault();

    if (!errors) {
      console.log(values);
      setTimeout(() => {
        Message.success('Success');
        forms.reset();
      }, 2000);
    }
  };

  handleEmailValidator = (forms, value, callback) => {
    const reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;

    if (value && !reg.test(value)) {
      callback('Email needs to be in validation email format!');
    }
  };

  handleConfirmValidator = (forms, value, callback) => {
    if (value !== forms.email) {
      callback("Two inputs don't match!");
    }
  };

  handleNameValidator = (forms, value, callback) => {
    if (value && value.length < 3) {
      callback('Full name needs to be at least 3 characters long');
    }
  };
}

ReactDOM.render(<App />, mountNode);
```
