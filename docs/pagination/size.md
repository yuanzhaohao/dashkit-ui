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
import { Pagination } from 'dashkit-ui';

ReactDOM.render(
  <div className="pagination-wrapper">
    <Pagination
      total={500}
      defaultCurrent={10}
      pageSize={10}
      size="large"
    />
    <Pagination
      total={500}
      defaultCurrent={10}
      pageSize={10}
      size="default"
    />
    <Pagination
      total={500}
      defaultCurrent={10}
      pageSize={10}
      size="small"
    />
  </div>,
  mountNode
);
```