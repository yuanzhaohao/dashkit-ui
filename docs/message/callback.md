---
order: 2
title:
  zh-CN: 回调
  en-US: Callback
subtitle: 
  zh-CN: 可以设置`onClose`回调函数。
  en-US: Use `onClose` to set callback Function.
---

```js
import { Message, Button } from 'dashkit-ui';

const show = () => {
  Message.show('Setup a callback function', 1.5, () => Message.success('Callback successfully!'))
};

ReactDOM.render(
  <Button onClick={show}>Set up a callback</Button>,
  mountNode
);
```