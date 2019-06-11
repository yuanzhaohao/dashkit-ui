---
order: 0
title:
  zh-CN: 基本
  en-US: Basic
subtitle:
  zh-CN: 非受控组件的用法，可以用`total`、`defaultCurrent`、 `pageSize` 和 `range`来控制页面。
  en-US: Uncontrolled usage. Use `total`, `current`, `pageSize` and `range` to control Pagination.
---

```js
import { Pagination } from 'dashkit-ui';

function onChange(page) {
  console.log(`current page: ${page}`);
}

ReactDOM.render(<Pagination total={500} defaultCurrent={10} onChange={onChange} />, mountNode);
```
