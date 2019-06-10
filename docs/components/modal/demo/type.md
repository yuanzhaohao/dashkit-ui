---
order: 1
title:
  zh-CN: 类型
  en-US: Type
subtitle:
  zh-CN: 基本用法，使用`type`来控制是否打开dialog。
  en-US: In the various types of information modal dialog, only one button to close dialog is provided.
---

```js
import { Modal, Button } from 'dashkit-ui';

function success() {
  Modal.success({
    title: 'This is a success message',
    content: (
      <div>
        <p>some messages...some messages...</p>
        <p>some messages...some messages...</p>
      </div>
    ),
    onConfirm() {
      console.log('call onConfirm callback');
    },
  });
}

function info() {
  Modal.info({
    title: 'This is a notification message',
    content: 'some messages...some messages...',
  });
}

function error() {
  Modal.error({
    title: 'This is a error message',
    content: 'some messages...some messages...',
  });
}

function warning() {
  Modal.warning({
    title: 'This is a warning message',
    content: 'some messages...some messages...',
  });
}

ReactDOM.render(
  <div className="modal-btn">
    <Button onClick={success}>Success</Button>
    <Button onClick={info}>Info</Button>
    <Button onClick={error}>Error</Button>
    <Button onClick={warning}>Warning</Button>
  </div>,
  mountNode,
);
```
