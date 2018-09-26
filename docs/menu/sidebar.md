---
order: 1
title:
  zh-CN: 侧边栏
  en-US: Sidebar
subtitle:
  zh-CN: 垂直排列的菜单。
  en-US: Vertical Menu.
---

```js
import { Menu, Grid } from 'dashkit-ui';
const { Row, Col } = Grid;
const { Item, SubMenu } = Menu;

class MenuDemo extends React.Component {
  render() {
    const { theme } = this.props;
    return (
      <Menu defaultActive="Dashboard" defaultOpeneds={['Layouts', 'Menu']} theme={theme}>
        <Item icon="home" index="Dashboard">Dashboard</Item>
        <Item icon="clipboard" index="Getting started">Getting started</Item>
        <SubMenu icon="book-open" title="Components" index="Components">
          <Item index="Alert">Alert</Item>
          <Item index="button">Button</Item>
          <Item index="input">Input</Item>
          <Item index="Layout">Layout</Item>
          <SubMenu title="Menu" index="Menu">
            <Item index="MenuItem">MenuItem</Item>
            <Item index="MenuSubmenu">MenuSubmenu</Item>
          </SubMenu>
        </SubMenu>
        <Item icon="git-branch" index="Changelog" disabled>Changelog</Item>
        <SubMenu icon="layout" index="Layouts" title="Layouts">
          <Item index="Slidenav">Slidenav</Item>
          <Item index="Topnav">Topnav</Item>
        </SubMenu>
        <SubMenu icon="file" index="Empty submenu" title="Empty submenu">
        </SubMenu>
      </Menu>
    );
  }
}

ReactDOM.render(
  <Row>
    <Col xs={6} className="menu-item">
      <MenuDemo theme="light" />
    </Col>
    <Col xs={6} className="menu-item">
      <MenuDemo theme="dark" />
    </Col>
  </Row>,
  mountNode
);
```