import '@/scss/bootstrap.scss';
import './app.scss';

import * as React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as classNames from 'classnames';
import { Layout } from '../../src';
import store from '../redux/store';
import asyncComponent from './async-component';
const { Header, Content, Footer } = Layout;

const Index = asyncComponent(() => import('./index'))

export default () => (
  <Provider store={store}>
    <HashRouter>
      <Layout>
        <Layout>
          <Header className="header" />
          <Content>
            <Switch>
              <Route exact path="/" component={Index} />
              <Route exact path="/index" component={Index} />
              <Redirect to="/" />
            </Switch>
          </Content>
          <Footer>Powered by Yuan Zhaohao</Footer>
        </Layout>
      </Layout>
    </HashRouter>
  </Provider>
)
