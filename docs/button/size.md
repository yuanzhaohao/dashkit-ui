---
order: 1
title:
  zh-CN: 尺寸
  en-US: Sizes
subtitle: 
  zh-CN: 可以设置`size`属性来定义尺寸，属性值包括`large`、`default`、`small`，默认是`default`。
  en-US: If a large or small button is desired, set the size property to either `large` or `small` respectively. Omit the `size` property for a button with the default size.
---

```js
import { Button } from 'dashkit-ui';

ReactDOM.render(
  <div className="button-list">
    <Button size="large">Large</Button>
    <Button size="default">Default</Button>
    <Button size="small">Small</Button>
    <Button type="primary" size="large" round={true}>Large</Button>
    <Button type="primary" size="default" round={true}>Default</Button>
    <Button type="primary" size="small" round={true}>Small</Button>
  </div>,
  mountNode
);
```