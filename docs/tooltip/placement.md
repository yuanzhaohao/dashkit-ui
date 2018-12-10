---
order: 1
title:
  zh-CN: 位置
  en-US: Placement
subtitle:
  zh-CN: 位置
  en-US: The attribute `placement` determines the position of the tooltip. Its value is `[orientation]-[alignment]` with four orientations `top`, `left`, `right`, `bottom` and three alignments `start`, `end`, `null`, and the default alignment is null.
---

```js
import { Tooltip, Button } from 'dashkit-ui';

ReactDOM.render(
  <div className="tooltip-container">
    <Tooltip content="Top Left tooltip prompt text" placement="top-start">
      <Button>top-start</Button>
    </Tooltip>
  </div>,
  mountNode
);
```