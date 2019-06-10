---
order: 2
title:
  zh-CN: 受控组件
  en-US: Controlled usage
subtitle:
  zh-CN: 受控组件，使用`current`来控制分页。
  en-US: Controlled usage. Use `current` property to control the pagination.
---

```js
import { Pagination } from 'dashkit-ui';

class Demo extends React.Component {
  state = {
    current: 10,
  };

  render() {
    return (
      <Pagination
        total={500}
        current={this.state.current}
        pageSize={10}
        onChange={this.handleChange}
      />
    );
  }

  handleChange = current => {
    console.log(`Current page: ${current}`);
    this.setState({ current });
  };
}

ReactDOM.render(<Demo />, mountNode);
```
