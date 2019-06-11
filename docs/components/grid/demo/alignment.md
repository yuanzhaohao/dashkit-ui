---
order: 5
title:
  zh-CN: 对齐
  en-US: Alignment
subtitle:
  zh-CN: 可以使用`start` `middle` `end`, `center`, `top`, 将元素对齐到行开头或结尾以及列的顶部、底部或中心
  en-US: Add classes to align elements to the start or end of row as well as the top, bottom, or center of a column.
---

```js
import { Grid } from 'dashkit-ui';
const { Row, Col } = Grid;

ReactDOM.render(
  <div className="grid-alignment">
    <h4 className="grid-title grid-title-first">.start-</h4>
    <Row>
      <Col xs={12}>
        <div className="grid-box">
          <Row start="xs">
            <Col xs={6}>
              <div className="grid-box grid-box-nested" />
            </Col>
          </Row>
        </div>
      </Col>
    </Row>

    <h4 className="grid-title">.center-</h4>
    <Row>
      <Col xs={12}>
        <div className="grid-box">
          <Row center="xs">
            <Col xs={6}>
              <div className="grid-box grid-box-nested" />
            </Col>
          </Row>
        </div>
      </Col>
    </Row>

    <h4 className="grid-title">.end-</h4>
    <Row>
      <Col xs={12}>
        <div className="grid-box">
          <Row centender="xs">
            <Col xs={6}>
              <div className="grid-box grid-box-nested" />
            </Col>
          </Row>
        </div>
      </Col>
    </Row>

    <h4 className="grid-title">.top-</h4>
    <Row top="xs">
      <Col xs={6}>
        <div className="grid-box grid-box-large" />
      </Col>
      <Col xs={6}>
        <div className="grid-box" />
      </Col>
    </Row>

    <h4 className="grid-title">.middle-</h4>
    <Row middle="xs">
      <Col xs={6}>
        <div className="grid-box grid-box-large" />
      </Col>
      <Col xs={6}>
        <div className="grid-box" />
      </Col>
    </Row>

    <h4 className="grid-title">.bottom-</h4>
    <Row bottom="xs">
      <Col xs={6}>
        <div className="grid-box grid-box-large" />
      </Col>
      <Col xs={6}>
        <div className="grid-box" />
      </Col>
    </Row>
  </div>,
  mountNode,
);
```
