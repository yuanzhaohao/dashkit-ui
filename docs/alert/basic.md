---
order: 0
title:
  zh-CN: 基本
  en-US: Basic
subtitle: 
  zh-CN: 基本用法，可以用`type`来定义Alert的样式。
  en-US: Use `type` to define the style of Alert.
---

```js
import { Alert } from 'dashkit-ui';

ReactDOM.render(
  <div className="alert-wrapper">
    <Alert type="primary">A simple primary alert—check it out!</Alert>
    <Alert type="success">
      <h4>Well done!</h4>
      Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.
      <hr />
      Whenever you need to, be sure to use margin utilities to keep things nice and tidy.
    </Alert>
    <Alert type="danger">A simple danger alert—check it out!</Alert>
    <Alert type="warning">A simple warning alert—check it out!</Alert>
    <Alert type="info">A simple info alert—check it out!</Alert>
  </div>,
  mountNode
);
```