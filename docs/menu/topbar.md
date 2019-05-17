---
order: 1
title:
  zh-CN: 顶部导航
  en-US: Topbar
subtitle:
  zh-CN: 水平排列的菜单。
  en-US: Horizontal Menu.
---

```js
import { Menu, Grid } from 'dashkit-ui';
const { Row, Col } = Grid;
const { Item, SubMenu } = Menu;

class MenuDemo extends React.Component {
  render() {
    const { theme } = this.props;
    return (
      <Menu
        defaultActiveKey="Dashboard"
        theme={theme}
        mode="horizontal"
        onSelect={this.onMenuSelect}
        onOpen={this.onSubMenuOpen}
      >
        <Item icon="home" index="Dashboard">
          Dashboard
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
          <Item index="Topnav">Topnav</Item>
        </SubMenu>
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
  <div>
    <Row>
      <Col xs={12} className="menu-horizontal-item">
        <MenuDemo theme="light" />
      </Col>
      <Col xs={12} className="menu-horizontal-item">
        <MenuDemo theme="dark" />
      </Col>
    </Row>
  </div>,
  mountNode,
);
```
