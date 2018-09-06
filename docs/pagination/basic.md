---
order: 0
title:
  zh-CN: 基本
  en-US: Basic
subtitle: 
  zh-CN: 基本用法，可以用`total`、`current`、 `pageSize` 和 `range`来控制页面。
  en-US: Use `total`, `current`, `pageSize` and `range` to control Pagination.
---

```js
import { Pagination } from 'dashkit-ui';

ReactDOM.render(
  <Pagination
    total={500}
    current={10}
    pageSize={10}
  />,
  mountNode
);
```