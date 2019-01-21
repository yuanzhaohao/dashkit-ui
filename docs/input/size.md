---
order: 1
title:
  zh-CN: 尺寸
  en-US: Size
subtitle:
  zh-CN: 可以设置`size`属性来定义尺寸，属性值包括`large`、`default`、`small`，默认是`default`。
  en-US: If a large or small button is desired, set the size property to either `large` or `small` respectively. Omit the `size` property for a button with the default size.
---

```js
import { Input } from 'dashkit-ui';

ReactDOM.render(
  <div className="input-list">
    <Input placeholder="large size" size="large" />
    <Input placeholder="default size" size="default" />
    <Input placeholder="small size" size="small" />
  </div>,
  mountNode
);
```