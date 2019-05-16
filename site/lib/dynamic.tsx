import * as React from 'react';
import { Spin } from '../../src';

export type DynamicImportCallback<P> = () => Promise<{
  default: React.ComponentType<P>;
}>;

export type DynamicImportState<P> = {
  component: React.ComponentType<P> | null;
};

export default function dynamic<P>(importComponent: DynamicImportCallback<P>) {
  return class DynamicComponent extends React.Component<P, DynamicImportState<P>> {
    constructor(props: P) {
      super(props);
      this.state = {
        component: null,
      };
    }

    public async componentDidMount() {
      const { default: component } = await importComponent();

      this.setState({
        component,
      });
    }

    public render() {
      return this.state.component ? (
        <this.state.component {...this.props} />
      ) : (
        <div className="page-loading">
          <Spin text="Loading..." spinning={true} />
        </div>
      );
    }
  };
}
