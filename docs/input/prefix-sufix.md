---
order: 3
title:
  zh-CN: 前缀后缀
  en-US: prefix and suffix
subtitle:
  zh-CN: 使用`prefix`或者`suffix`来增加前缀或者后缀。
  en-US: Add `prefix` or `suffix` icons inside input..
---

```js
import { Input, Tooltip, Icon } from 'dashkit-ui';

ReactDOM.render(
  <Input
    placeholder="Enter your username"
    prefix="user"
    suffix="info"
  />,
  mountNode
);
```