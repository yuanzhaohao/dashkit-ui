import * as React from 'react';
import './example.scss';

type ExampleProps = {
  markdownText: string;
};

class Example extends React.PureComponent<ExampleProps> {
  private dataMeta: any;
  private dataSource: any;
  constructor(props: ExampleProps) {
    super(props);
    this.dataMeta = this.getDataMeta();
    this.dataSource = this.getDataSource();
  }

  public componentDidMount() {
    if (this.refs.code) {
      (window as any).Prism.highlightElement(this.refs.code);
    }
  }
  public render() {
    const { markdownText } = this.props;
    const { dataMeta, dataSource } = this;

    return (
      <div className="app-example">
        {/* <div className="app-example-content">{children}</div> */}
        <div className="app-example-info">
          {dataMeta.title ? <div className="app-example-title">{dataMeta.title}</div> : null}
          {dataMeta.subtitle ? <div className="app-example-subtitle">{dataMeta.subtitle}</div> : null}
        </div>
        {markdownText
          ? <pre className="app-example-code show-code">
            <code className="language-jsx" ref="code">{dataSource}</code>
          </pre>
          : null
        }
      </div>
    )
  }

  private getDataSource = () => {
    const { markdownText } = this.props;
    if (markdownText) {
      // const reg = /```(.*)\n?([^]+)```/;
      const reg = /```(.*)js\s?([^]+?)```/;
      const sourceMatch = markdownText.match(reg);
      console.log(sourceMatch)
      if (sourceMatch && sourceMatch.length && sourceMatch[2]) {
        return sourceMatch[2];
      }
      return '';
    }
  }

  private getDataMeta = () => {
    const { markdownText } = this.props;
    const metaData: any = {};
    if (markdownText) {
      const reg = /```\s?meta\s?([^]+?)```/g;
      const metaMatch = markdownText.match(reg);
      if (metaMatch && metaMatch.length && metaMatch[2]) {
        const originData = metaMatch[2];
        const lines = originData.trim().split('\n');

        lines.forEach((line: any) => {
          const ary = line.trim().split(':');
          if (ary && ary.length > 1) {
            metaData[ary[0]] = ary[1].trim();
          }
        });
      }
    }
    return metaData;
  }
}

export default Example;