import './app.less'

import * as React from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '../redux/store'
import asyncComponent from '../lib/async-component'

const Index = asyncComponent(() => import('./index/index'))
const Detail = asyncComponent(() => import('./detail/detail'))

export default () => (
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Index} />
        <Route exact path="/index" component={Index} />
        <Route exact path="/detail" component={Detail} />
        <Redirect to="/" />
      </Switch>
    </HashRouter>
  </Provider>
)
