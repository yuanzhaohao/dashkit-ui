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
const { Item, SubMenu } = Menu;

ReactDOM.render(
  <Row>
    <Col xs={6}>
      <Menu>
        <Item icon="home">Dashboard</Item>
        <Item icon="clipboard">Getting started</Item>
        <SubMenu icon="book-open" title="Components">
          <Item>Alert</Item>
          <Item>Button</Item>
          <Item>Input</Item>
          <Item>Layout</Item>
        </SubMenu>
        <Item icon="git-branch">Changelog</Item>
      </Menu>
    </Col>
    <Col xs={6}></Col>
  </Row>,
  mountNode
);
```