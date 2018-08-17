import * as React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Layout } from '../../src';
import store from '../redux/store';
import CommonHeader from './common/header';
import CommonSidebar from './common/sidebar';
import asyncComponent from './async-component';

import './app.scss';

const { Content, Footer, Sidebar } = Layout;
const Index = asyncComponent(() => import('./index'));
const PageButton = asyncComponent(() => import('./button'));

export default () => (
  <Provider store={store}>
    <HashRouter>
      <Layout>
        <CommonSidebar />
        <Layout className="app-layout">
          <CommonHeader />
          <Content className="app-content">
            <Switch>
              <Route exact path="/" component={Index} />
              <Route exact path="/index" component={Index} />
              <Route exact path="/components/button" component={PageButton} />
              <Redirect to="/" />
            </Switch>
          </Content>
          <Footer className="app-footer">Powered by Yuan Zhaohao</Footer>
        </Layout>
      </Layout>
    </HashRouter>
  </Provider>
)
