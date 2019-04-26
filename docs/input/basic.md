---
order: 0
title:
  zh-CN: 基本
  en-US: Basic
subtitle:
  zh-CN: 基本用法。
  en-US: Basic usage.
---

```js
import { Input } from 'dashkit-ui';

ReactDOM.render(
  <div>
    <Input defaultValue="Hello." />
    <Input disabled defaultValue="Hello." style={{ marginTop: 10 }} />
  </div>,
  mountNode
);
```