---
order: 2
title:
  zh-CN: 图标
  en-US: Icon
subtitle: 
  zh-CN: 图标，`icon`来决定是否使用图标。
  en-US: Use `icon` to use icon.
---

```js
import { Alert } from 'dashkit-ui';

ReactDOM.render(
  <div className="alert-wrapper">
    <Alert type="success" icon closable>
      <h4>Well done!</h4>
      Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.
      <hr />
      Whenever you need to, be sure to use margin utilities to keep things nice and tidy.
    </Alert>
    <Alert type="danger" icon closable>A simple danger alert—check it out!</Alert>
    <Alert type="warning" icon closable>A simple warning alert—check it out!</Alert>
    <Alert type="info" icon closable>A simple info alert—check it out!</Alert>
  </div>,
  mountNode
);
```