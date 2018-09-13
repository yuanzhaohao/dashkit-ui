---
order: 1
title:
  zh-CN: 关闭
  en-US: Closable
subtitle: 
  zh-CN: 可关闭，可以用`closable`控制展示关闭按钮。
  en-US: Can be closable. Use `Closable` to close the Alert.
---

```js
import { Alert } from 'dashkit-ui';

const onClose = function (e) {
  console.log(e, 'I was closed.');
};

ReactDOM.render(
  <div className="alert-wrapper">
    <Alert type="primary" closable>A simple primary alert with close button!</Alert>
    <Alert type="success" closable onClose={onClose}>
      <h4>Well done!</h4>
      Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.
      <hr />
      Whenever you need to, be sure to use margin utilities to keep things nice and tidy.
    </Alert>
  </div>,
  mountNode
);
```