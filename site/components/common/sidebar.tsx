import './sidebar.scss';

import * as React from 'react';
import * as classNames from 'classnames';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Layout, Menu, Icon } from 'dashkit-ui';
// import LogoSvg from '../../assets/logo.svg';
const { Sidebar } = Layout;
const { SubMenu, Item, ItemGroup } = Menu;

interface SidebarProps extends RouteComponentProps<any> {
  pageMap: {
    [key: string]: string[];
  };
}

interface SidebarState {
  visible: boolean;
}

class AppSidebar extends React.PureComponent<SidebarProps, SidebarState> {
  constructor(props: SidebarProps) {
    super(props);
    this.state = {
      visible: false,
    };
  }
  public render() {
    const { pageMap, location } = this.props;
    const { pathname } = location;
    const { visible } = this.state;
    const activeIndex = pathname;
    return (
      <Sidebar className="app-sidebar">
        <div
          className={classNames('sidebar-content', {
            ['sidebar-content-slide']: visible,
          })}
        >
          <div className="sidebar-logo">
            {/* <LogoSvg className="sidebar-logo-img" /> */}
            <div className="sidebar-logo-title">Dashkit UI</div>
          </div>
          <Menu
            className="sidebar-menu"
            defaultActiveKey={activeIndex}
            defaultOpenKeys={['Components']}
            onSelect={this.handleMenuSelect}
          >
            <Item icon="home" index="/">
              Dashboard
            </Item>
            <Item icon="clipboard" index="/quickstart">
              Quickstart
            </Item>
            <SubMenu icon="book-open" title="Components" index="Components">
              {Object.keys(pageMap).map(group => (
                <ItemGroup title={group} key={group}>
                  {pageMap[group].map(page => (
                    <Item key={page} index={`/components/${page.toLowerCase()}`}>
                      {page}
                    </Item>
                  ))}
                </ItemGroup>
              ))}
            </SubMenu>
          </Menu>
        </div>
        <div
          className={classNames('sidebar-toggle', {
            ['sidebar-toggle-slide']: visible,
          })}
          onClick={this.handleToggleMenu}
        >
          <Icon type={visible ? 'x' : 'menu'} />
        </div>
        {visible ? <div className="sidebar-mask" onClick={this.handleToggleMenu} /> : null}
      </Sidebar>
    );
  }

  private handleMenuSelect = (page: string) => {
    const { pageMap, location, history } = this.props;
    let pages = [];

    Object.keys(pageMap).forEach(key => {
      pages = pages.concat(pageMap[key]);
    });

    if (location.pathname !== page) {
      history.push(page);
      setTimeout(() => {
        window.document.documentElement.scrollTo(0, 0);
      }, 50);
    }
  };

  private handleToggleMenu = () => {
    const { visible } = this.state;
    this.setState({
      visible: !visible,
    });
  };
}

export default withRouter(AppSidebar);
