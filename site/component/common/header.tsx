import * as React from 'react';
import { Layout } from '../../../src';
import './header.scss';

const { Header } = Layout;

class AppHeader extends React.Component {
  render() {
    return (
      <Header className="app-header"></Header>
    )
  }
}

export default AppHeader;