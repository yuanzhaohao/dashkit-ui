import './app.scss';

import * as React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Layout } from 'dashkit-ui';
import CommonHeader from './common/header';
import CommonSidebar from './common/sidebar';
// import dynamic from '../lib/dynamic';
import Page from './common/page';

const { Content, Footer } = Layout;
// const Index = dynamic(() => import('./index'));
const locale = window.localStorage.getItem('DASHKIT_UI_LOCALE') || 'en-US';

const pageMap = {
  Basic: ['Button', 'Icon'],
  Layout: ['Layout', 'Grid', 'Card'],
  Form: ['Radio', 'Checkbox', 'Switch', 'Input', 'Select', 'Calendar', 'Form'],
  Data: ['Table', 'Pagination'],
  Function: ['Menu', 'Modal', 'Spin'],
  Feedback: ['Tooltip', 'Popover', 'Alert', 'Message'],
};

// @ts-ignore
const pages = Object.values(pageMap).reduce((accumulator, cur) => accumulator.concat(cur));

export default () => (
  <HashRouter>
    <Layout>
      <CommonSidebar pageMap={pageMap} />
      <Layout className="app-layout">
        <CommonHeader />
        <Content className="app-content">
          <Switch>
            <Route exact path="/" render={() => <Page page="index" locale={locale} />} />
            {pages.map(page => (
              <Route
                exact
                key={page}
                path={`/components/${page}`}
                render={() => <Page page={`components/${page}`} locale={locale} />}
              />
            ))}
            <Redirect to="/" />
          </Switch>
        </Content>
        <Footer className="app-footer">Powered by Yuan Zhaohao</Footer>
      </Layout>
    </Layout>
  </HashRouter>
);
