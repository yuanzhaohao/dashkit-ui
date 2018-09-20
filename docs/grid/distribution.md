---
order: 6
title:
  zh-CN: 分布
  en-US: Distribution
subtitle:
  zh-CN: 可以使用`around` `between`, 将元素对齐到行开头或结尾以及列的顶部、底部或中心
  en-US: Use `around` `between` to distribute the contents of a row or column.
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
              <div className="grid-box grid-box-nested"></div>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>

  </div>,
  mountNode
);
```