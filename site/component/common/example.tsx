import * as React from 'react';
import './example.scss';

type ExampleProps = {
  title?: string;
};

class Example extends React.PureComponent<ExampleProps> {
  render() {
    const { title, children } = this.props;
    return (
      <div className="app-example">
        {children}
      </div>
    )
  }
}

export default Example;