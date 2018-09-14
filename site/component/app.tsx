import * as React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Layout } from 'dashkit-ui';
import CommonHeader from './common/header';
import CommonSidebar from './common/sidebar';
import asyncComponent from './common/async-component';

import './app.scss';

const { Content, Footer } = Layout;
const Index = asyncComponent(() => import('./index'));
const PageButton = asyncComponent(() => import('./button'));
const PageAlert = asyncComponent(() => import('./alert'));
const PageMessage = asyncComponent(() => import('./message'));
const PageIcon = asyncComponent(() => import('./icon'));
const PageSpin = asyncComponent(() => import('./spin'));
const PageInput = asyncComponent(() => import('./input'));
const PageSwitch = asyncComponent(() => import('./switch'));
const PagePagination = asyncComponent(() => import('./pagination'));

export default () => (
  <HashRouter>
    <Layout>
      <CommonSidebar />
      <Layout className="app-layout">
        <CommonHeader />
        <Content className="app-content">
          <Switch>
            <Route exact path="/" component={Index} />
            <Route exact path="/index" component={Index} />
            <Route exact path="/components/alert" component={PageAlert} />
            <Route exact path="/components/button" component={PageButton} />
            <Route exact path="/components/message" component={PageMessage} />
            <Route exact path="/components/spin" component={PageSpin} />
            <Route exact path="/components/icon" component={PageIcon} />
            <Route exact path="/components/input" component={PageInput} />
            <Route exact path="/components/switch" component={PageSwitch} />
            <Route exact path="/components/pagination" component={PagePagination} />
            <Redirect to="/" />
          </Switch>
        </Content>
        <Footer className="app-footer">Powered by Yuan Zhaohao</Footer>
      </Layout>
    </Layout>
  </HashRouter>
)
