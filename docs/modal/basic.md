---
order: 0
title:
  zh-CN: 基本
  en-US: Basic
subtitle:
  zh-CN: 基本用法，使用`visible`来控制是否打开dialog。
  en-US: Use `visible` to define Modal's style.
---

```js
import { Modal, Button } from 'dashkit-ui';

class App extends React.Component {
  state = {
    visible: false,
  };

  render() {
    return (
      <div>
        <Button onClick={this.handleClick}>Click</Button>
        <Modal
          visible={this.state.visible}
          title="Modal Title"
          onCancel={this.handleCancel}
        >
          <p>Contents...</p>
          <p>Contents...</p>
          <p>Contents...</p>
        </Modal>
      </div>
    );
  }

  handleClick = () => {
    this.setState({
      visible: true,
    });
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }
};

ReactDOM.render(
  <App />,
  mountNode
);
```