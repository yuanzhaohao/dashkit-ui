import * as React from 'react';
import './example.scss';

type ExampleProps = {
  title?: string;
  desc?: string;
};

class Example extends React.PureComponent<ExampleProps> {
  componentDidMount() {
    (window as any).Prism.highlightElement(this.refs.code);
  }
  render() {
    const { title, desc, children } = this.props;
    let codeString = `
      <div className="button-list">
  <Button
    outline={false}
    prefixCls="dashkit-btn"
    round={false}
    size="large"
    type="default"
  >
    Large
  </Button>
</div>`;

    const element = React.createElement(codeString);
    
    return (
      <div className="app-example">
        <div className="app-example-content">{children}</div>
        <div className="app-example-info">
          {title ? <div className="app-example-title">{title}</div> : null}
          {desc ? <div className="app-example-desc">{desc}</div> : null}
        </div>
        {codeString
          ? <pre className="app-example-code show-code">
            <code className="language-jsx" ref="code">{codeString}</code>
          </pre>
          : null
        }
      </div>
    )
  }
}

export default Example;