import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { transform } from 'babel-standalone'; // tslint:disable-line
import './example.scss';

type ExampleProps = {
  markdownText: string;
};

class Example extends React.PureComponent<ExampleProps> {
  private dataMeta: any;
  private dataSource: any;
  private contentKey: any;
  constructor(props: ExampleProps) {
    super(props);
    this.dataMeta = this.getDataMeta();
    this.dataSource = this.getDataSource();
    this.contentKey = `${(Math.random() * 1e9).toString(36)}`
  }

  public componentDidMount() {
    if (this.refs.code) {
      (window as any).Prism.highlightElement(this.refs.code);
    }

    if (this.dataSource) {
      import('../../../src').then((Element: any) => {
        const args = ['context', 'React', 'ReactDOM']
        const argv = [this, React, ReactDOM]

        for (const key in Element) {
          args.push(key)
          argv.push(Element[key])
        }

        return {
          args,
          argv,
        }
      }).then(({ args, argv }) => {
        const code = transform(`
          class Demo extends React.Component {
            ${this.dataSource}
          }

          ReactDOM.render(<Demo {...context.props} />, document.getElementById('${this.contentKey}'))
        `, 
        {
          presets: ['es2015', 'react']
        }).code;

        args.push(code);

        new Function(...args).apply(null, argv);
      })
    }
  }
  public render() {
    const { markdownText } = this.props;
    const { dataMeta, dataSource } = this;

    return (
      <div className="app-example">
        <div className="app-example-content" id={this.contentKey}></div>
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
      const reg = /```(.*)js\s?([^]+?)```/;
      const sourceMatch = markdownText.match(reg);
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
      const reg = /```(.*)meta\s?([^]+?)```/;
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