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
import { Form, Input, Button } from 'dashkit-ui';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
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
