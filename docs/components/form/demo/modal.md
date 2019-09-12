---
order: 4
title:
  zh-CN: 和Modal一起使用
  en-US: Use with Modal
subtitle:
  zh-CN: 和Modal一起使用
  en-US: Use with Modal.
---

```js
import { Form, Input, Button, Modal } from 'dashkit-ui';

class App extends React.Component {
  state = {
    visible: false,
  };
  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Open a Modal
        </Button>
        <Modal
          visible={this.state.visible}
          onClose={this.handleCancel}
          showFooter={false}
          title="Request an Invite"
        >
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
        </Modal>
      </div>
    );
  }

  handleSubmit = (event, values, error) => {
    event.preventDefault();

    console.log(values, error);
  };

  handleValidator = (forms, value, callback) => {
    if (value !== forms.email) {
      callback("Two inputs don't match!");
    }
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };
}

ReactDOM.render(<App />, mountNode);
```
