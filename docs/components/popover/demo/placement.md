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

const title = <span>Title</span>;
const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

ReactDOM.render(
  <div className="popover-box">
    <div className="popover-box-top">
      <Popover content={content} title={title} placement="top-start" trigger="focus">
        <Button className="popover-button">top-start</Button>
      </Popover>
      <Popover content={content} title={title} placement="top" trigger="focus">
        <Button className="popover-button">top</Button>
      </Popover>
      <Popover content={content} title={title} placement="top-end" trigger="focus">
        <Button className="popover-button">top-end</Button>
      </Popover>
    </div>
    <div className="popover-box-left">
      <Popover content={content} title={title} placement="left-start" trigger="focus">
        <Button className="popover-button">left-start</Button>
      </Popover>
      <Popover content={content} title={title} placement="left" trigger="focus">
        <Button className="popover-button">left</Button>
      </Popover>
      <Popover content={content} title={title} placement="left-end" trigger="focus">
        <Button className="popover-button">left-end</Button>
      </Popover>
    </div>
    <div className="popover-box-right">
      <Popover content={content} title={title} placement="right-start" trigger="focus">
        <Button className="popover-button">right-start</Button>
      </Popover>
      <Popover content={content} title={title} placement="right" trigger="focus">
        <Button className="popover-button">right</Button>
      </Popover>
      <Popover content={content} title={title} placement="right-end" trigger="focus">
        <Button className="popover-button">right-end</Button>
      </Popover>
    </div>
    <div className="popover-box-bottom">
      <Popover content={content} title={title} placement="bottom-start" trigger="focus">
        <Button className="popover-button">bottom-start</Button>
      </Popover>
      <Popover content={content} title={title} placement="bottom" trigger="focus">
        <Button className="popover-button">bottom</Button>
      </Popover>
      <Popover content={content} title={title} placement="bottom-end" trigger="focus">
        <Button className="popover-button">bottom-end</Button>
      </Popover>
    </div>
  </div>,
  mountNode,
);
```
