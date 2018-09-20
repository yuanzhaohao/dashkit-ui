---
order: 4
title:
  zh-CN: 嵌套
  en-US: Nested Grids
subtitle:
  zh-CN: 在网格中嵌套网格。
  en-US: Nest grids inside grids inside grids.
---

```js
import { Grid } from 'dashkit-ui';
const { Row, Col } = Grid;

ReactDOM.render(
  <div className="grid-nested">
    <Row>
      <Col xs={7}>
        <div className="grid-box">
          <Row>
            <Col xs={9}>
              <div className="grid-box grid-box-first">
                <Row>
                  <Col xs={4}>
                    <div className="grid-box grid-box-nested"></div>
                  </Col>
                  <Col xs={8}>
                    <div className="grid-box grid-box-nested"></div>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col xs={3}>
              <div className="grid-box grid-box-first">
                <Row>
                  <Col xs>
                    <div className="grid-box grid-box-nested"></div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </Col>
      <Col xs={5}>
        <div className="grid-box">
          <Row>
            <Col xs={12}>
              <div className="grid-box grid-box-first">
                <Row>
                  <Col xs={6}>
                    <div className="grid-box grid-box-nested"></div>
                  </Col>
                  <Col xs={6}>
                    <div className="grid-box grid-box-nested"></div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  </div>,
  mountNode
);
```