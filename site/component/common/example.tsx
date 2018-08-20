import * as React from 'react';
import * as CodeMirror from 'codemirror';
import './example.scss';

type ExampleProps = {
  title?: string;
  desc?: string;
};

class Example extends React.PureComponent<ExampleProps> {
  componentDidMount() {
    const codeElement = this.refs.code;
    
  }
  render() {
    const { title, desc, children } = this.props;
    const codeString = `<Button>a</Button>`;
    
    return (
      <div className="app-example">
        <div className="app-example-content">{children}</div>
        <div className="app-example-info">
          {title ? <div className="app-example-title">{title}</div> : null}
          {desc ? <div className="app-example-desc">{desc}</div> : null}
        </div>
        <code className="app-example-code" ref="code">
          {codeString}
        </code>
      </div>
    )
  }
}

export default Example;