---
order: 1
title:
  zh-CN: 尺寸
  en-US: Sizes
subtitle:
  zh-CN: 可以设置`size`属性来定义尺寸，属性值包括`large`、`default`、`small`，默认是`default`。
  en-US: If a large or small switch is desired, set the size property to either `large` or `small` respectively. Omit the `size` property for a button with the default size.
---

```js
import { Switch } from 'dashkit-ui';

ReactDOM.render(
  <div className="switch-list">
    <Switch size="large" />
    <Switch size="default" />
    <Switch size="small" />
  </div>,
  mountNode
);
```