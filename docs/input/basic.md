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
const inputStyle = {
  marginRight: 10,
};
ReactDOM.render(
  <div>
    <Input defaultValue="Hello." style={inputStyle} />
    <Input disabled defaultValue="Hello." />
  </div>,
  mountNode
);
```