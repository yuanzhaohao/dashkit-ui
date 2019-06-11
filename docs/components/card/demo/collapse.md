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
const cardStyle = {
  width: 240,
};

const collapseStyle = {
  marginTop: 20,
};

const Demo = () => (
  <div>
    <Card style={cardStyle} collapse={true}>
      <Card.Header>Header</Card.Header>
      <Card.Body>
        A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be
        found as a welcome guest in many households across the world.
      </Card.Body>
    </Card>

    <Card.Collapse style={collapseStyle} defaultActiveIndexs={['1']}>
      <Card index="1">
        <Card.Header>This is header 1</Card.Header>
        <Card.Body>
          A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be
          found as a welcome guest in many households across the world.
        </Card.Body>
      </Card>
      <Card index="2">
        <Card.Header>This is header 1</Card.Header>
        <Card.Body>
          A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be
          found as a welcome guest in many households across the world.
        </Card.Body>
      </Card>
      <Card index="3">
        <Card.Header>This is header 3</Card.Header>
        <Card.Body>
          A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be
          found as a welcome guest in many households across the world.
        </Card.Body>
      </Card>
    </Card.Collapse>
  </div>
);

ReactDOM.render(<Demo />, mountNode);
```
