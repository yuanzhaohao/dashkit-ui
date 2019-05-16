import './example.scss';

import * as React from 'react';
import { Icon } from 'dashkit-ui';
import { CSSTransition } from 'react-transition-group';

type ExampleProps = {
  dataSource: any;
  locale?: string;
};

type ExampleState = {
  visible: boolean;
};

class Example extends React.PureComponent<ExampleProps, ExampleState> {
  public readonly codeElement: React.RefObject<HTMLDivElement>;
  constructor(props: ExampleProps) {
    super(props);
    this.codeElement = React.createRef();
    this.state = {
      visible: false,
    };
  }

  public render() {
    const { locale = 'en-US' } = this.props;
    const { meta, code, preview } = this.props.dataSource;
    const { visible } = this.state;

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
            type={visible ? 'folder-minus' : 'folder-plus'}
            className="example-control"
            onClick={this.handleControlClick}
          />
        </div>
        <CSSTransition
          in={visible}
          timeout={300}
          unmountOnExit
          onEnter={this.handleEnter}
          onEntered={this.handleEntered}
          onExit={this.handleExit}
          onExiting={this.handleExiting}
          classNames="example-code"
        >
          <pre className="example-code">
            <code className="language-jsx" ref={this.codeElement}>
              {code}
            </code>
          </pre>
        </CSSTransition>
      </div>
    );
  }

  public handleControlClick = () => {
    const { visible } = this.state;
    const newValue = !visible;
    this.setState({
      visible: newValue,
    });
  };

  public handleEnter = el => {
    if (el.scrollHeight !== 0) {
      el.style.height = el.scrollHeight + 'px';
    }
    const codeElement = this.codeElement.current;
    (window as any).Prism.highlightElement(codeElement);
  };

  public handleEntered = el => {
    el.style.height = '';
  };

  public handleExit = el => {
    el.style.height = el.scrollHeight + 'px';
  };

  public handleExiting = el => {
    if (el.scrollHeight !== 0) {
      el.style.height = '0';
    }
  };
}

export default Example;
