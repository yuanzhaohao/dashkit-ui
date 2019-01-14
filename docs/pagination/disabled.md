---
order: 3
title:
  zh-CN: 禁用
  en-US: Disabled
subtitle:
  zh-CN: 使用`disabled`来决定是否禁用分页，默认值是`false`。
  en-US: Add the `disabled` property to determine if the pagination is disabled.
---

```js
import { Pagination } from 'dashkit-ui';

ReactDOM.render(
  <Pagination total={500} current={10} pageSize={10} disabled />,
  mountNode
);
```