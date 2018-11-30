---
order: 0
title:
  zh-CN: 基本
  en-US: Basic
subtitle:
  zh-CN: 基本的使用。
  en-US: The most basic usage.
---

```js
import { Tooltip } from 'dashkit-ui';

ReactDOM.render(
  <Tooltip content="prompt text">
    <span>Tooltip will show when mouse enter.</span>
  </Tooltip>,
  mountNode
);
```