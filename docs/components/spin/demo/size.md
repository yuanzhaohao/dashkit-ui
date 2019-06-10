---
order: 1
title:
  zh-CN: 尺寸
  en-US: Sizes
subtitle:
  zh-CN: 可以设置`size`属性来定义尺寸，属性值包括`large`、`default`、`small`，默认是`default`。
  en-US: use `size` to set size.
---

```js
import { Spin } from 'dashkit-ui';

ReactDOM.render(
  <div className="spin-list">
    <Spin spining={true} size="small" />
    <Spin spining={true} size="default" />
    <Spin spining={true} size="large" />
  </div>,
  mountNode,
);
```
