---
order: 2
title:
  zh-CN: 禁用
  en-US: Disabled
subtitle:
  zh-CN: 使用`disabled`禁用checkbox.
  en-US: Use `disabled` to disable Checkbox.
---

```js
import { Checkbox } from 'dashkit-ui';

ReactDOM.render(
  <div className="checkbox-list">
    <Checkbox disabled>Disabled 1</Checkbox>
    <Checkbox defaultChecked disabled>
      Disabled 2
    </Checkbox>
  </div>,
  mountNode,
);
```
