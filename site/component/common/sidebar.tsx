import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Layout, Menu } from 'dashkit-ui';
import LogoSvg from '../../assets/logo.svg';
import './sidebar.scss';
const { Sidebar } = Layout;
const { SubMenu, Item, ItemGroup } = Menu;

interface SidebarProps extends RouteComponentProps<any> {
  pageMap: {
    [key: string]: string[];
  };
};

class AppSidebar extends React.PureComponent<SidebarProps> {
  render() {
    const { pageMap } = this.props;
    return (
      <Sidebar className="sidebar">
        <Menu
          className="sidebar-menu"
          defaultActive="Dashboard"
          defaultOpeneds={['Components']}
          onSelect={this.onMenuSelect}
        >
          <div className="sidebar-logo">
            <LogoSvg className="sidebar-logo-img" />
            <div className="sidebar-logo-title">Dashkit UI</div>
          </div>

          <Item icon="home" index="Dashboard">Dashboard</Item>
          <SubMenu icon="book-open" title="Components" index="Components">
            {Object.keys(pageMap).map((group) =>
              <ItemGroup title={group}>
                {pageMap[group].map((page) =>
                  <Item key={page} index={page}>{page}</Item>
                )}
              </ItemGroup>
            )}
          </SubMenu>
        </Menu>
      </Sidebar>
    )
  }

  onMenuSelect = (index: string) => {
    const { pages, location, history } = this.props;
    const page = pages.indexOf(index) === -1 ? index : `/components/${index}`;

    if (location.pathname !== page) {
      history.push(page);
    }
  }
}

export default withRouter(AppSidebar);