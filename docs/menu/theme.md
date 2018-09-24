---
order: 1
title:
  zh-CN: 主题
  en-US: Theme
subtitle:
  zh-CN: 主题。
  en-US: Provides `light` and `dark` themes.
---

```js
import { Menu, Grid } from 'dashkit-ui';
const { Row, Col } = Grid;

ReactDOM.render(
  <Row>
    <Col xs={6}>
      <Menu>
        <Menu.Item icon="home">Dashboard</Menu.Item>
        <Menu.Item icon="clipboard">Getting started</Menu.Item>
        <Menu.Item icon="book-open">Components</Menu.Item>
        <Menu.Item icon="git-branch">Changelog</Menu.Item>
      </Menu>
    </Col>
    <Col xs={6}></Col>
  </Row>,
  mountNode
);
```