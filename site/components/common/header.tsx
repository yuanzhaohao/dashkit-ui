import './header.scss';

import * as React from 'react';
import { Layout } from 'dashkit-ui';
import GithubSvg from '../../assets/github.svg';

const { Header } = Layout;

const AppHeader = () => (
  <Header className="app-header">
    <a href="https://github.com/yuanzhaohao/dashkit-ui" target="_blank" className="header-link">
      <GithubSvg className="header-github" />
    </a>
  </Header>
);

export default AppHeader;
