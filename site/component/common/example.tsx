import './example.scss';

import * as React from 'react';
import { Icon } from 'dashkit-ui';

type ExampleProps = {
  dataSource: any;
};

type ExampleState = {
  showCode: boolean;
};


class Example extends React.PureComponent<ExampleProps, ExampleState> {
  constructor(props: ExampleProps) {
    super(props);
    this.state = {
      showCode: false,
    };
  }

  public render() {
    const { dataMeta, dataCode, previewer } = this.props.dataSource;
    const { showCode } = this.state;

    return (
      <div className="example">
        <div className="example-content">{previewer()}</div>
        <div className="example-info">
          {dataMeta.title ? <div className="example-title">{dataMeta.title}</div> : null}
          {dataMeta.subtitle
            ? <div className="example-subtitle" dangerouslySetInnerHTML={{
              __html: dataMeta.subtitle,
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

export default Example;