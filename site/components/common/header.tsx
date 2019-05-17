import './header.scss';

import * as React from 'react';
import GithubSvg from '../../assets/github.svg';
import { Layout } from 'dashkit-ui';

const { Header } = Layout;

class AppHeader extends React.Component {
  public render() {
    return (
      <Header className="app-header">
        <a href="https://github.com/yuanzhaohao/dashkit-ui" target="_blank" className="header-link">
          <GithubSvg className="header-github" />
        </a>
      </Header>
    );
  }
}

export default AppHeader;
