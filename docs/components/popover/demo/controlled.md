---
order: 3
title:
  zh-CN: 受控组件
  en-US: Controlled Component
subtitle:
  zh-CN: 受控组件的用法
  en-US: Controlled Component usage.
---

```js
import { Popover, Button } from 'dashkit-ui';

class App extends React.Component {
  state = {
    visible: false,
  };

  render() {
    return (
      <Popover
        content={
          <a onClick={this.hide} style={{ cursor: 'pointer' }}>
            Close
          </a>
        }
        title="Title"
        trigger="click"
        visible={this.state.visible}
      >
        <Button onClick={this.handleClick}>Click me</Button>
      </Popover>
    );
  }

  handleClick = () => {
    const { visible } = this.state;
    this.setState({
      visible: !visible,
    });
  };

  hide = () => {
    this.setState({
      visible: false,
    });
  };
}

ReactDOM.render(<App />, mountNode);
```
