import * as React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Layout, Grid } from 'dashkit-ui';
import CommonHeader from './common/header';
import CommonSidebar from './common/sidebar';
// import dynamic from '../lib/dynamic';
import Page from './common/page';
import './app.scss';

const { Content, Footer } = Layout;
const { Row, Col } = Grid;
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
        <Row center="xs" className="app-content">
          <Col xs={12} md={10} lg={8}>
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
          </Col>
        </Row>
        <Footer className="app-footer">Powered by Yuan Zhaohao</Footer>
      </Layout>
    </Layout>
  </HashRouter>
);
