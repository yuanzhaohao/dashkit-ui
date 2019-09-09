---
order: 1
title:
  zh-CN: 基本
  en-US: Alignment
subtitle:
  zh-CN: 根据具体目标和制约因素，选择最佳的标签对齐方式。
  en-US: Depending on your design, there are several different ways to align your label element.
---

```js
import { Form, Input, Button, Radio } from 'dashkit-ui';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      align: 'right',
    };
  }

  render() {
    const { align } = this.state;
    return (
      <div>
        <Radio.Group onChange={this.handleChange} value={align} style={{ marginBottom: 24 }}>
          <Radio value="left">Left</Radio>
          <Radio value="right">Right</Radio>
          <Radio value="top">Top</Radio>
        </Radio.Group>
        <Form labelAlign={align}>
          <Form.Item label="Name" required>
            <Input placeholder="Please input your name" />
          </Form.Item>
          <Form.Item label="Email">
            <Input placeholder="Please input your email" />
          </Form.Item>
        </Form>
      </div>
    );
  }

  handleChange = align => {
    console.log(`switch to alignment ${align}`);
    this.setState({ align });
  };
}

ReactDOM.render(<App />, mountNode);
```
