---
order: 2
title:
  zh-CN: 主题
  en-US: Theme
subtitle:
  zh-CN: 主题。
  en-US: Provides `light` and `dark` themes.
---

```js
import { Menu, Switch } from 'dashkit-ui';
const { Item, SubMenu } = Menu;

class MenuDemo extends React.Component {
  state = {
    theme: 'light',
  };
  render() {
    const { theme } = this.state;
    return (
      <div className="menu-theme">
        <Switch
          className="menu-theme-switch"
          onChange={this.handleSwitchChange}
          checkedChildren="Dark"
          unCheckedChildren="Light"
        />

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
      </div>
    );
  }

  handleSwitchChange = () => {

  }
}

ReactDOM.render(
  <MenuDemo />,
  mountNode
);
```