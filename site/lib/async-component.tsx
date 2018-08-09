import * as React from 'react';
import { Spin } from '../../src/index';

type State = {
  component: any,
};
export default function asyncComponent(importComponent: any) {
  class AsyncComponent extends React.Component<State> {
    constructor(props: any) {
      super(props)
      this.state = {
        component: null
      }
    }

    public async componentDidMount() {
      const { default: component } = await importComponent();

      this.setState({
        component
      });
    }

    public render() {
      return (
        this.state.component
          ? <this.state.component {...this.props} />
          : <div className="page-loading">
            <Spin text="Loading..." />
          </div>
      )
    }
  }

  return AsyncComponent
}
