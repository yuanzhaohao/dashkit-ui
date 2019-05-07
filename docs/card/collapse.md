---
order: 1
title:
  zh-CN: 基本
  en-US: Collapse
subtitle:
  zh-CN: 基本用法。
  en-US: Basic usage.
---

```js
import { Card } from 'dashkit-ui';

ReactDOM.render(
  <Card>
    <Card.Header style={gray}>Header</Card.Header>
    <Card.Body>Body</Card.Body>
    <Card.Footer style={gray}>Footer</Card.Footer>
  </Card>,
  mountNode
);
```