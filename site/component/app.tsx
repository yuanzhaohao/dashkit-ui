import './app.scss';

import * as React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Layout } from 'dashkit-ui';
import CommonHeader from './common/header';
import CommonSidebar from './common/sidebar';
import asyncComponent from './common/async-component';
import Page from './common/page';

const { Content, Footer } = Layout;
const Index = asyncComponent(() => import('./index'));

const pageMap = {
  Basic: ['Button', 'Icon'],
  Layout: ['Layout', 'Grid', 'Card'],
  Form: ['Radio', 'Checkbox', 'Switch', 'Input', 'Select', 'Calendar', 'Form'],
  Data: ['Table', 'Pagination'],
  Function: ['Menu', 'Modal', 'Spin'],
  Feedback: ['Tooltip', 'Popover', 'Alert', 'Message'],
};

let pages = [];
Object.keys(pageMap).forEach(key => {
  pages = pages.concat(pageMap[key]);
});

export default () => (
  <HashRouter>
    <Layout>
      <CommonSidebar pageMap={pageMap} />
      <Layout className="app-layout">
        <CommonHeader />
        <Content className="app-content">
          <Switch>
            <Route exact path="/" component={Index} />
            <Route exact path="/index" component={Index} />
            {pages.map(page => (
              <Route key={page} exact path={`/components/${page}`} component={Page} />
            ))}
            <Redirect to="/" />
          </Switch>
        </Content>
        <Footer className="app-footer">Powered by Yuan Zhaohao</Footer>
      </Layout>
    </Layout>
  </HashRouter>
);
