import * as React from 'react';
import Spin from '@/Spin/index';

export default function asyncComponent(importComponent: () => void) {
  class AsyncComponent extends React.Component {
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
      })
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
