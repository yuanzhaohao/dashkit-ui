import * as React from 'react';
import './page.scss';

import * as ReactDOM from 'react-dom';
import { Spin } from 'dashkit-ui';
import Example from './example';
// import { withRouter, RouteComponentProps } from 'react-router-dom';

type PageProps = {
  locale: string;
  page: string;
};

type PageState = {
  dataSource?: {
    markdown: string;
    demos: object[];
  } | null;
};

class Page extends React.Component<PageProps, PageState> {
  public readonly rootElement: React.RefObject<HTMLDivElement>;
  constructor(props: PageProps) {
    super(props);
    this.rootElement = React.createRef();
    this.state = {
      dataSource: null,
    };
  }

  public shouldComponentUpdate(nextProps: PageProps, nextState: PageState) {
    if (nextProps.page !== this.props.page || nextState.dataSource !== this.state.dataSource) {
      return true;
    }
    return false;
  }

  public async componentDidMount() {
    this.loadData();
  }

  public async componentDidUpdate() {
    const { dataSource } = this.state;
    const { locale } = this.props;
    const demoElement = document.getElementById('demos');
    this.loadData();

    if (demoElement && dataSource.demos && Object.keys(dataSource.demos)) {
      const demoData = Object.keys(dataSource.demos)
        .map(key => dataSource.demos[key])
        .sort((a, b) => a.meta.order - b.meta.order);
      const children = demoData.map((d, key) => {
        return <Example key={key} locale={locale} dataSource={d} />;
      });
      ReactDOM.render(children, demoElement);
    } else if (this.rootElement && this.rootElement.current) {
      const rootElement = this.rootElement.current;
      const codeElements = rootElement.querySelectorAll('pre code');
      if (codeElements && codeElements.length > 0) {
        codeElements.forEach(codeElement => {
          (window as any).Prism.highlightElement(codeElement);
        });
      }
    }
  }

  public render() {
    const { dataSource } = this.state;

    return dataSource && dataSource.markdown ? (
      <div
        ref={this.rootElement}
        dangerouslySetInnerHTML={{
          __html: dataSource.markdown,
        }}
      />
    ) : (
      <div className="page-loading">
        <Spin text="Loading..." spinning={true} />
      </div>
    );
  }

  private loadData = async () => {
    const { page, locale } = this.props;
    const dataSource = await import(`../../../docs/${page.toLocaleLowerCase()}/${locale}.md`);

    this.setState({
      dataSource,
    });
  };
}

export default Page;
