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
    const pathnameAry = pathname.slice(1).split('/');
    const activeIndex = pathnameAry.length === 1 ? 'Dashboard' : pathnameAry[1];
    const { visible } = this.state;
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
            <Item icon="home" index="Dashboard">
              Dashboard
            </Item>
            <SubMenu icon="book-open" title="Components" index="Components">
              {Object.keys(pageMap).map(group => (
                <ItemGroup title={group} key={group}>
                  {pageMap[group].map(page => (
                    <Item key={page} index={page}>
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

  private handleMenuSelect = (index: string) => {
    const { pageMap, location, history } = this.props;
    let pages = [];

    Object.keys(pageMap).forEach(key => {
      pages = pages.concat(pageMap[key]);
    });

    const page = pages.indexOf(index) === -1 ? '/' : `/components/${index}`;

    if (location.pathname !== page) {
      history.push(page);
      const { visible } = this.state;
      this.setState({
        visible: !visible,
      });
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
