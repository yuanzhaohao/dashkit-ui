---
order: 0
title:
  zh-CN: 基本
  en-US: Basic
subtitle:
  zh-CN: 使用`show`、`success`、`error`、`info`、`warning`来展示不同的消息。
  en-US: Use `show`, `success`, `error`, `info`, `warning` to show different messages.
---

```js
import { Message, Button } from 'dashkit-ui';

const show = () => {
  Message.show('This is a message of show');
};

const success = () => {
  Message.success('This is a message of success');
};

const error = () => {
  Message.error('This is a message of error');
};

const info = () => {
  Message.info('This is a message of info');
};

const warning = () => {
  Message.warning('This is message of warning');
};

ReactDOM.render(
  <div className="message-wrapper">
    <Button onClick={show}>Show</Button>
    <Button onClick={success}>Success</Button>
    <Button onClick={error}>Error</Button>
    <Button onClick={info}>Info</Button>
    <Button onClick={warning}>Warning</Button>
  </div>,
  mountNode,
);
```
