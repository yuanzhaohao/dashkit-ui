import * as React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Layout } from '../../src';
import store from '../redux/store';
import CommonHeader from './common/header';
import CommonSidebar from './common/sidebar';
import asyncComponent from './common/async-component';

import './app.scss';

const { Content, Footer } = Layout;
const Index = asyncComponent(() => import('./index'));
const PageButton = asyncComponent(() => import('./button'));
const PageSpin = asyncComponent(() => import('./spin'));
const PageIcon = asyncComponent(() => import('./icon'));

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
              <Route exact path="/components/spin" component={PageSpin} />
              <Route exact path="/components/icon" component={PageIcon} />
              <Redirect to="/" />
            </Switch>
          </Content>
          <Footer className="app-footer">Powered by Yuan Zhaohao</Footer>
        </Layout>
      </Layout>
    </HashRouter>
  </Provider>
)
