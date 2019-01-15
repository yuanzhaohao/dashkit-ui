import './header.scss';

import * as React from 'react';
import { Layout } from 'dashkit-ui';
import GithubSvg from '../../assets/github.svg';

const { Header } = Layout;

class AppHeader extends React.Component {
  render() {
    return (
      <Header className="app-header">
        <a href="https://github.com/yuanzhaohao/dashkit-ui" className="header-link">
          <GithubSvg className="header-github" />
        </a>
      </Header>
    )
  }
}

export default AppHeader;