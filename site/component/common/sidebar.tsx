import * as React from 'react';
import { Layout } from '../../../src';
import LogoSvg from '../../assets/logo.svg';
import './sidebar.scss';

const { Sidebar } = Layout;

class AppSidebar extends React.PureComponent {
  render() {
    return (
      <Sidebar className="app-sidebar">
        <div className="sidebar-logo">
          <LogoSvg className="sidebar-logo-img" />
          <div className="sidebar-logo-title">Discreet UI</div>
        </div>
      </Sidebar>
    )
  }
}

export default AppSidebar;