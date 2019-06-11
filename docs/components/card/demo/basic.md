---
order: 0
title:
  zh-CN: 基本
  en-US: Basic
subtitle:
  zh-CN: 基本用法。
  en-US: Basic usage.
---

```js
import { Card } from 'dashkit-ui';

const cardStyle = {
  width: 240,
  height: 300,
  display: 'inline-flex',
  marginRight: 20,
};
const gray = { background: '#f7f7f7' };

const Demo = () => (
  <div>
    <Card style={cardStyle}>
      <Card.Header>Header</Card.Header>
      <Card.Body>Body</Card.Body>
      <Card.Footer>Footer</Card.Footer>
    </Card>

    <Card style={cardStyle}>
      <Card.Header style={gray}>Header</Card.Header>
      <Card.Body>Body</Card.Body>
      <Card.Footer style={gray}>Footer</Card.Footer>
    </Card>
  </div>
);

ReactDOM.render(<Demo />, mountNode);
```
