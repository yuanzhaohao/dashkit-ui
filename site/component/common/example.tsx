import './example.scss';

import * as React from 'react';
import * as marked from 'marked';
import { Icon } from '../../../src';

type ExampleProps = {
  dataSource: any;
};

type ExampleState = {
  showCode: boolean;
};


class Example extends React.PureComponent<ExampleProps, ExampleState> {
  private contentKey: any;
  constructor(props: ExampleProps) {
    super(props);
    this.contentKey = `${(Math.random() * 1e9).toString(36)}`;
    this.state = {
      showCode: false,
    };
  }

  public render() {
    const { dataMeta, dataCode, component } = this.props.dataSource;
    const { showCode } = this.state;
    console.log(typeof component, component);

    return (
      <div className="example">
        <div className="example-content" ref={this.contentKey}></div>
        <div className="example-content" ref={this.contentKey}></div>
        <div className="example-info">
          {dataMeta.title ? <div className="example-title">{dataMeta.title}</div> : null}
          {dataMeta.subtitle
            ? <div className="example-subtitle" dangerouslySetInnerHTML={{
              __html: marked(dataMeta.subtitle),
            }} />
            : null
          }
          <Icon 
            type={showCode ? 'folder-minus' : 'folder-plus'} 
            className="example-control" 
            onClick={this.onControlClick}
          />
        </div>
        {showCode
          ? <pre className="example-code">
            <code className="language-jsx" ref="code">{dataCode}</code>
          </pre>
          : null
        }
      </div>
    )
  }

  private onControlClick = () => {
    const { showCode } = this.state;
    const newValue = !showCode
    this.setState({
      showCode: newValue,
    });
    setTimeout(() => {
      if (newValue && this.refs.code) {
        (window as any).Prism.highlightElement(this.refs.code);
      }
    }, 0);
  }
}

function convert(str) {
  str = str.replace(/(&#x)(\w{4});/gi, function ($0) {
    return String.fromCharCode(parseInt(encodeURIComponent($0).replace(/(%26%23x)(\w{4})(%3B)/g, '$2'), 16));
  });
  return str;
}

export default Example;