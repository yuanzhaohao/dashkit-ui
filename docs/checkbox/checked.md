---
order: 1
title:
  zh-CN: 状态
  en-US: Checked
subtitle:
  zh-CN: 使用`checked`设置受控组件.
  en-US: Use `disabled` to defined Controlled component.
---

```js
import { Checkbox } from 'dashkit-ui';

ReactDOM.render(
  <div className="checkbox-list">
    <Checkbox checked={false}>checked false</Checkbox>
    <Checkbox checked={true}>checked true</Checkbox>
    <Checkbox indeterminate>checked indeterminate</Checkbox>
  </div>
  ,
  mountNode
);
```