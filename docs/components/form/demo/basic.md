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

    this.state = {
      form: {
        name: '',
        email: '',
      },
    };
  }

  render() {
    return (
      <Form>
        <Form.Item label="Name" required>
          <Input value={this.state.form.name} onChange={this.handleChange.bind(this, 'name')} />
        </Form.Item>
        <Form.Item label="Email">
          <Input value={this.state.form.email} onChange={this.handleChange.bind(this, 'email')} />
        </Form.Item>
        <Form.Item>
          <Button type="primary">Submit</Button>
          <Button style={{ marginLeft: 10 }}>Reset</Button>
        </Form.Item>
      </Form>
    );
  }

  handleChange = (key, value) => {
    this.state.form[key] = value;
    this.forceUpdate();
  };
}

ReactDOM.render(<App />, mountNode);
```
