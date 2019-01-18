---
order: 1
title:
  zh-CN: 位置
  en-US: Placement
subtitle:
  zh-CN: 位置
  en-US: The attribute `placement` determines the position of the popover. Its value is `[orientation]-[alignment]` with four orientations `top`, `left`, `right`, `bottom` and three alignments `start`, `end`, `null`, and the default alignment is null.
---

```js
import { Popover, Button } from 'dashkit-ui';

const text = <span>Title</span>;
const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

ReactDOM.render(
  <div className="popover-box">
    <div className="popover-box-top">
      <Popover content={content} placement="top-start" trigger="click">
        <Button className="popover-button">top-start</Button>
      </Popover>
      <Popover content={content} placement="top" trigger="click">
        <Button className="popover-button">top</Button>
      </Popover>
      <Popover content={content} placement="top-end" trigger="click">
        <Button className="popover-button">top-end</Button>
      </Popover>
    </div>
    <div className="popover-box-left">
      <Popover content="Left Top popover prompt text" placement="left-start" trigger="focus">
        <Button className="popover-button">left-start</Button>
      </Popover>
      <Popover content="Left Center popover prompt text" placement="left" trigger="focus">
        <Button className="popover-button">left</Button>
      </Popover>
      <Popover content="Left Bottom popover prompt text" placement="left-end" trigger="focus">
        <Button className="popover-button">left-end</Button>
      </Popover>
    </div>
    <div className="popover-box-right">
      <Popover content="Right Top popover prompt text" placement="right-start" trigger="focus">
        <Button className="popover-button">right-start</Button>
      </Popover>
      <Popover content="Right Center popover prompt text" placement="right" trigger="focus">
        <Button className="popover-button">right</Button>
      </Popover>
      <Popover content="Right Bottom popover prompt text" placement="right-end" trigger="focus">
        <Button className="popover-button">right-end</Button>
      </Popover>
    </div>
    <div className="popover-box-bottom">
      <Popover content="Bottom Left popover prompt text" placement="bottom-start" trigger="focus">
        <Button className="popover-button">bottom-start</Button>
      </Popover>
      <Popover content="Bottom Center popover prompt text" placement="bottom" trigger="focus">
        <Button className="popover-button">bottom</Button>
      </Popover>
      <Popover content="Bottom Right popover prompt text" placement="bottom-end" trigger="focus">
        <Button className="popover-button">bottom-end</Button>
      </Popover>
    </div>
  </div>,
  mountNode
);
```