---
order: 2
title:
  zh-CN: 确认
  en-US: Confirm
subtitle:
  zh-CN: 基本用法，使用`type`来控制是否打开dialog。
  en-US: In the various types of information modal dialog, only one button to close dialog is provided.
---

```js
import { Modal, Button } from 'dashkit-ui';

function confirm() {
  Modal.confirm({
    title: 'This is a confirm message',
    content: (
      <div>
        <p>some messages...some messages...</p>
        <p>some messages...some messages...</p>
      </div>
    ),
    onConfirm() {
      console.log('call onConfirm callback')
    },
    onCancel() {
      console.log('call onCancel callback')
    }
  });
}

ReactDOM.render(
  <Button onClick={confirm}>Confirm</Button>,
  mountNode
);
```