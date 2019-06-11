---
order: 1
title:
  zh-CN: 时间
  en-US: Duration
subtitle:
  zh-CN: 可以设置`duration`控制展示的时间。
  en-US: Use `duration` to control display time.
---

```js
import { Message, Button } from 'dashkit-ui';

const show = () => {
  Message.show('Display a 10s time message', 10);
};

ReactDOM.render(<Button onClick={show}>Display a 10s time message</Button>, mountNode);
```
