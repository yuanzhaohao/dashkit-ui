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
    <Alert type="success" icon closable>A simple success alert—check it out!</Alert>
    <Alert type="danger" icon closable>A simple danger alert—check it out!</Alert>
    <Alert type="warning" icon closable>A simple warning alert—check it out!</Alert>
    <Alert type="info" icon closable>A simple info alert—check it out!</Alert>
  </div>,
  mountNode
);
```