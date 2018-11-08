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
    <Alert icon>A simple success alert—check it out!</Alert>
    <Alert type="success" icon>A simple success alert—check it out!</Alert>
    <Alert type="warning" icon>A simple warning alert—check it out!</Alert>
    <Alert type="info" icon closable>A simple info alert—check it out!</Alert>
    <Alert type="error" icon closable>A simple error alert—check it out!</Alert>
  </div>,
  mountNode
);
```