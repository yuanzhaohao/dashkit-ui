import * as React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Layout } from '../../src';
import store from '../redux/store';
import AppHeader from './common/header';
import asyncComponent from './async-component';

import './app.scss';

const { Content, Footer, Sidebar } = Layout;
const Index = asyncComponent(() => import('./index'))

export default () => (
  <Provider store={store}>
    <HashRouter>
      <Layout>
        <Sidebar className="app-sidebar" />
        <Layout>
          <AppHeader />
          <Content>
            <Switch>
              <Route exact path="/" component={Index} />
              <Route exact path="/index" component={Index} />
              <Redirect to="/" />
            </Switch>
          </Content>
          <Footer className="app-footer">Powered by Yuan Zhaohao</Footer>
        </Layout>
      </Layout>
    </HashRouter>
  </Provider>
)
