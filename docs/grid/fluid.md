---
order: 1
title:
  zh-CN: 流式布局
  en-US: Fluid Layout
subtitle:
  zh-CN: 流式布局.
  en-US: Percent based widths allow fluid resizing of columns and rows.
---

```js
import { Grid } from 'dashkit-ui';
const { Row, Col } = Grid;

ReactDOM.render(
  <div className="grid-list">
    <Row>
      <Col xs={12} />
    </Row>
    <Row>
      <Col xs={1} />
      <Col xs={11} />
    </Row>
    <Row>
      <Col xs={2} />
      <Col xs={10} />
    </Row>
    <Row>
      <Col xs={3} />
      <Col xs={9} />
    </Row>
    <Row>
      <Col xs={4} />
      <Col xs={8} />
    </Row>
    <Row>
      <Col xs={5} />
      <Col xs={7} />
    </Row>
    <Row>
      <Col xs={6} />
      <Col xs={6} />
    </Row>
  </div>,
  mountNode
);
```