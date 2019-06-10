---
order: 0
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
const { Item, SubMenu, ItemGroup } = Menu;

class MenuDemo extends React.Component {
  render() {
    const { theme } = this.props;
    return (
      <Menu
        defaultActiveKey="Dashboard"
        defaultOpenKeys={['Layouts', 'Menu']}
        theme={theme}
        onSelect={this.onMenuSelect}
        onOpen={this.onSubMenuOpen}
      >
        <Item icon="home" index="Dashboard">
          Dashboard
        </Item>
        <Item icon="clipboard" index="Getting started">
          Getting started
        </Item>
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
        <Item icon="git-branch" index="Changelog" disabled>
          Changelog
        </Item>
        <SubMenu icon="layout" index="Layouts" title="Layouts">
          <Item index="Slidenav">Slidenav</Item>
          <ItemGroup title="ItemGroup">
            <Item index="ItemGroup1">ItemGroup1</Item>
            <Item index="ItemGroup2">ItemGroup2</Item>
          </ItemGroup>
        </SubMenu>
        <SubMenu icon="file" index="Empty submenu" title="Empty submenu" />
      </Menu>
    );
  }

  onMenuSelect = index => {
    console.log(`item selected: ${index}`);
  };

  onSubMenuOpen = index => {
    console.log(`submunu opened: ${index}`);
  };
}

ReactDOM.render(
  <Row>
    <Col xs={6} className="menu-vertical-item">
      <MenuDemo theme="light" />
    </Col>
    <Col xs={6} className="menu-vertical-item">
      <MenuDemo theme="dark" />
    </Col>
  </Row>,
  mountNode,
);
```
