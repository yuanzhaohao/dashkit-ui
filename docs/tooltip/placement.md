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
  <div className="tooltip-box">
    <div className="tooltip-box-top">
      <Tooltip content="Top Left tooltip prompt text" placement="top-start">
        <Button className="tooltip-button">top-start</Button>
      </Tooltip>
      <Tooltip content="Top Center tooltip prompt text" placement="top">
        <Button className="tooltip-button">top</Button>
      </Tooltip>
      <Tooltip content="Top Right tooltip prompt text" placement="top-end">
        <Button className="tooltip-button">top-end</Button>
      </Tooltip>
    </div>
    <div className="tooltip-box-left">
      <Tooltip content="Left Top tooltip prompt text" placement="left-start">
        <Button className="tooltip-button">left-start</Button>
      </Tooltip>
      <Tooltip content="Left Center tooltip prompt text" placement="left">
        <Button className="tooltip-button">left</Button>
      </Tooltip>
      <Tooltip content="Left Bottom tooltip prompt text" placement="left-end">
        <Button className="tooltip-button">left-end</Button>
      </Tooltip>
    </div>
    <div className="tooltip-box-right">
      <Tooltip content="Right Top tooltip prompt text" placement="right-start">
        <Button className="tooltip-button">right-start</Button>
      </Tooltip>
      <Tooltip content="Right Center tooltip prompt text" placement="right">
        <Button className="tooltip-button">right</Button>
      </Tooltip>
      <Tooltip content="Right Bottom tooltip prompt text" placement="right-end">
        <Button className="tooltip-button">right-end</Button>
      </Tooltip>
    </div>
    <div className="tooltip-box-bottom">
      <Tooltip content="Bottom Left tooltip prompt text" placement="bottom-start">
        <Button className="tooltip-button">bottom-start</Button>
      </Tooltip>
      <Tooltip content="Bottom Center tooltip prompt text" placement="bottom">
        <Button className="tooltip-button">bottom</Button>
      </Tooltip>
      <Tooltip content="Bottom Right tooltip prompt text" placement="bottom-end">
        <Button className="tooltip-button">bottom-end</Button>
      </Tooltip>
    </div>
  </div>,
  mountNode
);
```