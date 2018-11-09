import * as React from 'react';
import { Spin } from 'dashkit-ui';

export default function asyncComponent(importComponent: any) {
  class AsyncComponent extends React.PureComponent<any, any> {
    constructor(props: any) {
      super(props);
      this.state = {
        result: null
      };
    }

    public async componentDidMount() {
      const result = await importComponent();

      this.setState({
        result,
      });
    }

    public render() {
      const { result } = this.state;
      return (
        result && result.default
          ? <result.default />
          : <div className="page-loading">
            <Spin text="Loading..." spinning={true} />
          </div>
      );
    }
  }

  return AsyncComponent
}
