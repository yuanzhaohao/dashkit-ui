import './example.scss';

import * as React from 'react';
import { Icon } from 'dashkit-ui';

type ExampleProps = {
  dataSource: any;
  locale?: string;
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

  render() {
    const { locale = 'en-US' } = this.props;
    const { meta, code, preview } = this.props.dataSource;
    const { showCode } = this.state;

    return (
      <div className="example">
        <div className="example-content">{preview()}</div>
        <div className="example-info">
          {meta.title ? <div className="example-title">{meta.title[locale]}</div> : null}
          {meta.subtitle
            ? <div className="example-subtitle" dangerouslySetInnerHTML={{
              __html: meta.subtitle[locale],
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
            <code className="language-jsx" ref="code">{code}</code>
          </pre>
          : null
        }
      </div>
    )
  }

  onControlClick = () => {
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