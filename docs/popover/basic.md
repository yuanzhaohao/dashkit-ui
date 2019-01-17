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
import { Popover, Button } from 'dashkit-ui';

ReactDOM.render(
  <Popover content="prompt text">
    <Button>click me</Button>
  </Popover>,
  mountNode
);
```