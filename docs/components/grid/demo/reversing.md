---
order: 7
title:
  zh-CN: 反向
  en-US: Reversing
subtitle:
  zh-CN: 可以使用`reverse`设置反向。
  en-US: Use `reverse` to reverse.
---

```js
import { Grid } from 'dashkit-ui';
const { Row, Col } = Grid;

ReactDOM.render(
  <div className="grid-alignment">
    <h4 className="grid-title grid-title-first">.reverse-</h4>
    <Row>
      <Col xs={12}>
        <div className="grid-box">
          <Row reverse>
            <Col xs={2}>
              <div className="grid-box grid-box-nested">1</div>
            </Col>
            <Col xs={2}>
              <div className="grid-box grid-box-nested">2</div>
            </Col>
            <Col xs={2}>
              <div className="grid-box grid-box-nested">3</div>
            </Col>
            <Col xs={2}>
              <div className="grid-box grid-box-nested">4</div>
            </Col>
            <Col xs={2}>
              <div className="grid-box grid-box-nested">5</div>
            </Col>
            <Col xs={2}>
              <div className="grid-box grid-box-nested">6</div>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  </div>,
  mountNode,
);
```
