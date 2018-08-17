import * as React from 'react';
import './example.scss';

type ExampleProps = {
  title?: string;
  desc?: string;
};

class Example extends React.PureComponent<ExampleProps> {
  render() {
    const { title, desc, children } = this.props;
    
    return (
      <div className="app-example">
        <div className="app-example-content">{children}</div>
        <div className="app-example-info">
          {title ? <div className="app-example-title">{title}</div> : null}
          <div className="app-example-desc">{desc}</div>
        </div>
        <div className="app-example-code">
          
        </div>
      </div>
    )
  }
}

export default Example;