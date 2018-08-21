import * as React from 'react';
import './example.scss';

type ExampleProps = {
  markdownText?: string;
};

class Example extends React.PureComponent<ExampleProps> {
  componentDidMount() {
    if (this.refs.code) {
      (window as any).Prism.highlightElement(this.refs.code);
    }
  }
  render() {
    const { markdownText } = this.props;
    
    return (
      <div className="app-example">
        {/* <div className="app-example-content">{children}</div>
        <div className="app-example-info">
          {title ? <div className="app-example-title">{title}</div> : null}
          {desc ? <div className="app-example-desc">{desc}</div> : null}
        </div> */}
        {markdownText
          ? <pre className="app-example-code show-code">
            <code className="language-jsx" ref="code">{markdownText}</code>
          </pre>
          : null
        }
      </div>
    )
  }
}

export default Example;