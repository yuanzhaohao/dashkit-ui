---
order: 0
title:
  zh-CN: 响应式布局
  en-US: Responsive Layout
subtitle:
  zh-CN: 基本用法。
  en-US: Responsive modifiers enable specifying different column sizes, offsets, alignment and distribution at xs, sm, md & lg viewport widths.
---

```js
import { Grid } from 'dashkit-ui';
const { Row, Col } = Grid;

ReactDOM.render(
  <div className="grid-list">
    <Row>
      <Col xs={12} sm={3} md={2} lg={1} />
      <Col xs={6} sm={6} md={8} lg={10} />
      <Col xs={6} sm={3} md={2} lg={1} />
    </Row>

    <Row>
      <Col xs={12} sm={3} md={2} lg={1} />
      <Col xs={12} sm={9} md={10} lg={11} />
    </Row>

    <Row>
      <Col xs={10} sm={6} md={8} lg={10} />
      <Col xs={2} sm={6} md={4} lg={2} />
    </Row>
  </div>,
  mountNode
);
```