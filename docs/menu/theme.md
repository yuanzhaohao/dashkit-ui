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
      <Menu defaultActive="Dashboard">
        <Item icon="home" index="Dashboard">Dashboard</Item>
        <Item icon="clipboard" index="Getting started">Getting started</Item>
        <SubMenu icon="book-open" title="Components" index="book-open">
          <Item index="Alert">Alert</Item>
          <Item index="button">Button</Item>
          <Item index="input">Input</Item>
          <Item index="Layout">Layout</Item>
          <SubMenu title="Menu" index="menu">
            <Item index="MenuItem">MenuItem</Item>
            <Item index="MenuSubmenu">MenuSubmenu</Item>
          </SubMenu>
        </SubMenu>
        <Item icon="git-branch" index="Changelog" disabled>Changelog</Item>
        <SubMenu icon="layout" index="layout" title="Layouts">
          <Item index="Slidenav">Slidenav</Item>
          <Item index="Topnav">Topnav</Item>
        </SubMenu>
      </Menu>
    </Col>
    <Col xs={6}></Col>
  </Row>,
  mountNode
);
```