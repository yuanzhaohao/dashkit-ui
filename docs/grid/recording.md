---
order: 6
title:
  zh-CN: 位置
  en-US: Reordering
subtitle:
  zh-CN: 可以使用`first` `last`控制位置。
  en-US: Use `first` `last` to reorder columns.
---

```js
import { Grid } from 'dashkit-ui';
const { Row, Col } = Grid;

ReactDOM.render(
  <div className="grid-alignment">
    <h4 className="grid-title grid-title-first">.first-</h4>
    <Row>
      <Col xs={12}>
        <div className="grid-box">
          <Row>
            <Col xs={2}>
              <div className="grid-box grid-box-first">1</div>
            </Col>
            <Col xs={2}>
              <div className="grid-box grid-box-first">2</div>
            </Col>
            <Col xs={2}>
              <div className="grid-box grid-box-first">3</div>
            </Col>
            <Col xs={2}>
              <div className="grid-box grid-box-first">4</div>
            </Col>
            <Col xs={2}>
              <div className="grid-box grid-box-first">5</div>
            </Col>
            <Col xs={2} first="xs">
              <div className="grid-box grid-box-nested">6</div>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>

    <h4 className="grid-title grid-title">.last-</h4>
    <Row>
      <Col xs={12}>
        <div className="grid-box">
          <Row>
            <Col xs={2} last="xs">
              <div className="grid-box grid-box-nested">1</div>
            </Col>
            <Col xs={2}>
              <div className="grid-box grid-box-first">2</div>
            </Col>
            <Col xs={2}>
              <div className="grid-box grid-box-first">3</div>
            </Col>
            <Col xs={2}>
              <div className="grid-box grid-box-first">4</div>
            </Col>
            <Col xs={2}>
              <div className="grid-box grid-box-first">5</div>
            </Col>
            <Col xs={2}>
              <div className="grid-box grid-box-first">6</div>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>

  </div>,
  mountNode
);
```