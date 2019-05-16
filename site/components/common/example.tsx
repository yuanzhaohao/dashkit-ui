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
  public readonly codeElement: React.RefObject<HTMLDivElement>;
  constructor(props: ExampleProps) {
    super(props);
    this.codeElement = React.createRef();
    this.state = {
      showCode: false,
    };
  }

  public render() {
    const { locale = 'en-US' } = this.props;
    const { meta, code, preview } = this.props.dataSource;
    const { showCode } = this.state;

    return (
      <div className="example">
        <div className="example-content">{preview()}</div>
        <div className="example-info">
          {meta.title ? <div className="example-title">{meta.title[locale]}</div> : null}
          {meta.subtitle ? (
            <div
              className="example-subtitle"
              dangerouslySetInnerHTML={{
                __html: meta.subtitle[locale],
              }}
            />
          ) : null}
          <Icon
            type={showCode ? 'folder-minus' : 'folder-plus'}
            className="example-control"
            onClick={this.onControlClick}
          />
        </div>
        {showCode ? (
          <pre className="example-code">
            <code className="language-jsx" ref={this.codeElement}>
              {code}
            </code>
          </pre>
        ) : null}
      </div>
    );
  }

  public onControlClick = () => {
    const { showCode } = this.state;
    const newValue = !showCode;
    this.setState({
      showCode: newValue,
    });
    setTimeout(() => {
      const el = this.codeElement.current;
      if (newValue && el) {
        (window as any).Prism.highlightElement(el);
      }
    }, 0);
  };
}

export default Example;
