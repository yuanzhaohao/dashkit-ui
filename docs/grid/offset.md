---
order: 2
title:
  zh-CN: 偏移
  en-US: Offsets
subtitle:
  zh-CN: 偏移，通过设置`offset`参数.
  en-US: Offset a column.
---

```js
import { Grid } from 'dashkit-ui';
const { Row, Col } = Grid;

ReactDOM.render(
  <div className="grid-list">
    <Row>
      <Col xsOffset={11} xs={1} />
      <Col xsOffset={10} xs={2} />
      <Col xsOffset={9} xs={3} />
      <Col xsOffset={8} xs={4} />
      <Col xsOffset={7} xs={5} />
      <Col xsOffset={6} xs={6} />
      <Col xsOffset={5} xs={7} />
      <Col xsOffset={4} xs={8} />
      <Col xsOffset={3} xs={9} />
      <Col xsOffset={2} xs={10} />
      <Col xsOffset={1} xs={11} />
    </Row>
  </div>,
  mountNode
);
```