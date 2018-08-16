import * as React from 'react';
import { Spin } from '../../src';

type State = {
  component: React.ComponentType | null;
};
export default function asyncComponent(importComponent: any) {
  class AsyncComponent extends React.Component<any, State> {
   public state = {
      component: null
    };

    public async componentDidMount() {
      const { default: component } = await importComponent();

      this.setState({
        component,
      });
    }

    public render() {
      const { component } = this.state;
      return (
        component
          ? <component />
          : <div className="page-loading">
            <Spin text="Loading..." />
          </div>
      )
    }
  }

  return AsyncComponent
}
