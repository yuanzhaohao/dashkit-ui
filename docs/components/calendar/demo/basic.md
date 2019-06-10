---
order: 0
title:
  zh-CN: 基本
  en-US: Basic
subtitle:
  zh-CN: 基本用法，你可以选择多种日历选择弃。
  en-US: Use `type` to use different Calenders.
---

```js
import { Calendar, Grid } from 'dashkit-ui';
const { Col, Row } = Grid;

function onChange(value) {
  console.log(`value: ${value}`);
}

ReactDOM.render(
  <div>
    <Row className="calendar-item">
      <Col xs>
        <p>Day Picker</p>
        <Calendar onChange={onChange} />
      </Col>
      <Col xs>
        <p>Week Picker</p>
        <Calendar onChange={onChange} type="week" format="yyyy Wo" />
      </Col>
    </Row>
    <Row className="calendar-item">
      <Col xs>
        <p>Month Picker</p>
        <Calendar onChange={onChange} type="month" />
      </Col>
      <Col xs>
        <p>Year Picker</p>
        <Calendar onChange={onChange} type="year" />
      </Col>
    </Row>
    <Row className="calendar-item">
      <Col xs>
        <p>Time Picker</p>
        <Calendar onChange={onChange} type="time" />
      </Col>
      <Col xs>
        <p>Datetime Picker</p>
        <Calendar onChange={onChange} type="datetime" />
      </Col>
    </Row>
    <Row className="calendar-item">
      <Col xs>
        <p>Range Picker</p>
        <Calendar onChange={onChange} type="day" range />
      </Col>
    </Row>
    <Row className="calendar-item">
      <Col xs>
        <Calendar onChange={onChange} type="datetime" range />
      </Col>
    </Row>
  </div>,
  mountNode,
);
```
