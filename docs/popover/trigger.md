---
order: 3
title:
  zh-CN: 基本
  en-US: Trigger
subtitle:
  zh-CN: 事件触发, `hover`, `click`, `focus`
  en-US: Trigger events.
---

```js
import { Popover, Button } from 'dashkit-ui';

ReactDOM.render(
  <div>
    <Popover content="hover event" trigger="hover">
      <Button type="primary">Hover me</Button>
    </Popover>
    <Popover content="click event" trigger="click">
      <Button style={{marginLeft: 10}} type="primary">Click me</Button>
    </Popover>
    <Popover content="focus event" trigger="focus">
      <Button style={{marginLeft: 10}} type="primary">Focus me</Button>
    </Popover>
  </div>,
  mountNode
);
```