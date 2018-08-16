import * as React from 'react';
import { Spin } from '../../src';

type State = {
  component: React.ComponentType | null;
};
export default function asyncComponent(importComponent: any) {
  class AsyncComponent extends React.Component<any, State> {
    constructor(props: any) {
      super(props);
      this.state = {
        component: null
      };
    }

    public async componentDidMount() {
      const { default: component } = await importComponent();

      this.setState({
        component,
      });
    }

    public render() {
      return (
        this.state.component
          ? <this.state.component />
          : <div className="page-loading">
            <Spin text="Loading..." />
          </div>
      )
    }
  }

  return AsyncComponent
}
