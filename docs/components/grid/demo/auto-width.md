---
order: 3
title:
  zh-CN: 自动撑满
  en-US: Auto width
subtitle:
  zh-CN: 自动等分
  en-US: Add any number of auto sizing columns to a row. Let the grid figure it out.
---

```js
import { Grid } from 'dashkit-ui';
const { Row, Col } = Grid;

ReactDOM.render(
  <div className="grid-list">
    <Row>
      <Col xs />
      <Col xs />
    </Row>
    <Row>
      <Col xs />
      <Col xs />
      <Col xs />
    </Row>
  </div>,
  mountNode,
);
```
