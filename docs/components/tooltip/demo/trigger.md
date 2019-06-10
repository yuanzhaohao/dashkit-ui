---
order: 3
title:
  zh-CN: 基本
  en-US: Basic
subtitle:
  zh-CN: 基本的使用。
  en-US: The most basic usage.
---

```js
import { Tooltip, Button } from 'dashkit-ui';

ReactDOM.render(
  <div>
    <Tooltip content="hover event">
      <Button type="primary">Hover me</Button>
    </Tooltip>
    <Tooltip content="click event" trigger="click">
      <Button style={{ marginLeft: 10 }} type="primary">
        Click me
      </Button>
    </Tooltip>
    <Tooltip content="focus event" trigger="focus">
      <Button style={{ marginLeft: 10 }} type="primary">
        Focus me
      </Button>
    </Tooltip>
  </div>,
  mountNode,
);
```
