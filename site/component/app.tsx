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
const locale = window.localStorage.getItem('DASHKIT_UI_LOCALE') || 'en-US';

const pages = [
  'button', 'alert', 'message', 'spin', 'icon', 'input', 'switch', 'pagination',
].map(page => {
  return {
    page: page,
    component: asyncComponent(() => import(`./${page}`)),
    // component: asyncComponent(() => import(`../../docs/${name}/${locale}.md`)),
  };

})

console.log(pages);

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
            {pages.map(({ page, component }) =>
              <Route key={page} exact path={`/components/${page}`} component={component} />
            )}
            <Redirect to="/" />
          </Switch>
        </Content>
        <Footer className="app-footer">Powered by Yuan Zhaohao</Footer>
      </Layout>
    </Layout>
  </HashRouter>
)
