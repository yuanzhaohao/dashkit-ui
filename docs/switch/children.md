---
order: 4
title:
  zh-CN: 子组件
  en-US: Children
subtitle:
  zh-CN: 自定义文字的使用。
  en-US: use `checkedChildren` and `unCheckedChildren` to define children.
---

```js
import { Switch } from 'dashkit-ui';

ReactDOM.render(
  <div className="switch-list">
    <Switch size="large" checkedChildren="Open" unCheckedChildren="Close" />
    <Switch size="default" checkedChildren="Open" unCheckedChildren="Close" />
    <Switch size="small" checkedChildren="Open" unCheckedChildren="Close" />
  </div>,
  mountNode
);
```