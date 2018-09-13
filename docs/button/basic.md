---
order: 0
title:
  zh-CN: 基本
  en-US: Basic
subtitle: 
  zh-CN: 基本用法，可以用`type`、`outline`、 `round` 和 `circle`来定义button的样式。
  en-US: Use `type`, `outline`, `round` and `circle` to define Button's style.
---

```js
import { Button } from 'dashkit-ui';

ReactDOM.render(
  <div className="button-wrapper">
    <div className="button-list">
      <Button>Default</Button>
      <Button type="primary">Primary</Button>
      <Button type="success">Success</Button>
      <Button type="warning">Warning</Button>
      <Button type="danger">Danger</Button>
      <Button type="info">Info</Button>
      <Button type="link">Link</Button>
    </div>

    <div className="button-list">
      <Button outline>Outline</Button>
      <Button type="primary" outline>Primary</Button>
      <Button type="success" outline>Success</Button>
      <Button type="warning" outline>Warning</Button>
      <Button type="danger" outline>Danger</Button>
      <Button type="info" outline>Info</Button>
    </div>

    <div className="button-list">
      <Button round>Round</Button>
      <Button type="primary" round>Primary</Button>
      <Button type="success" round>Success</Button>
      <Button type="warning" round>Warning</Button>
      <Button type="danger" round>Danger</Button>
      <Button type="info" round>Info</Button>
    </div>
  </div>,
  mountNode
);
```