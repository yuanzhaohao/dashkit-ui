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
      <Button outline={true}>Outline</Button>
      <Button type="primary" outline={true}>Primary</Button>
      <Button type="success" outline={true}>Success</Button>
      <Button type="warning" outline={true}>Warning</Button>
      <Button type="danger" outline={true}>Danger</Button>
      <Button type="info" outline={true}>Info</Button>
    </div>

    <div className="button-list">
      <Button round={true}>Round</Button>
      <Button type="primary" round={true}>Primary</Button>
      <Button type="success" round={true}>Success</Button>
      <Button type="warning" round={true}>Warning</Button>
      <Button type="danger" round={true}>Danger</Button>
      <Button type="info" round={true}>Info</Button>
    </div>
  </div>,
  mountNode
);
```