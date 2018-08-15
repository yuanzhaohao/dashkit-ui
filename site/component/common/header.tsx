import * as React from 'react';
import { Layout } from '../../../src';

import './header.scss';

const { Header } = Layout;

class AppHeader extends React.Component {
  render() {
    return (
      <Header className="app-header">
        <div className="header-logo">
          <div className="header-logo-img" />
          <div className="header-logo-title">DASHKIT UI</div>
        </div>
      </Header>
    )
  }
}

export default AppHeader;