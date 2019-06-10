---
order: 2
title:
  zh-CN: 禁用
  en-US: Disabled
subtitle:
  zh-CN: 使用`disabled`禁用radio.
  en-US: Use `disabled` to disable Radio.
---

```js
import { Radio, Button } from 'dashkit-ui';

class App extends React.Component {
  state = {
    disabled: true,
  };

  toggleDisabled = () => {
    this.setState({
      disabled: !this.state.disabled,
    });
  };

  render() {
    const { disabled } = this.state;
    return (
      <div>
        <div className="checkbox-list">
          <Radio disabled={disabled}>Disabled 1</Radio>
          <Radio defaultChecked disabled={disabled}>
            Disabled 2
          </Radio>
        </div>
        <div style={{ marginTop: 20 }}>
          <Button type="primary" onClick={this.toggleDisabled} size="small">
            Toggle disabled
          </Button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
```
