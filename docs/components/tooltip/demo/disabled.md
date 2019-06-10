---
order: 2
title:
  zh-CN: 禁用
  en-US: Disabled
subtitle:
  zh-CN: 基本的使用。
  en-US: Disabled usage.
---

```js
import { Tooltip, Button } from 'dashkit-ui';

class Demo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: false,
    };
  }

  render() {
    const { disabled } = this.state;

    return (
      <Tooltip content="prompt text" disabled={disabled}>
        <Button onClick={this.handleClick}>
          click to {disabled ? 'active' : 'close'} tooltip function
        </Button>
      </Tooltip>
    );
  }

  handleClick = () => {
    const { disabled } = this.state;

    this.setState({
      disabled: !disabled,
    });
  };
}

ReactDOM.render(<Demo />, mountNode);
```
