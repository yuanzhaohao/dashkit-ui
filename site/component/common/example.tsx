import './example.scss';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as marked from 'marked';
import * as classNames from 'classnames';
import { transform } from 'babel-standalone'; 
// import * as transformer from '../../lib/transformer';
import { Icon } from '../../../src';

type ExampleProps = {
  markdownText: string;
};

type ExampleState = {
  showCode: boolean;
};


class Example extends React.PureComponent<ExampleProps, ExampleState> {
  private dataMeta: any;
  private dataSource: any;
  private contentKey: any;
  constructor(props: ExampleProps) {
    super(props);
    this.dataMeta = this.getDataMeta();
    this.dataSource = this.getDataSource();
    this.contentKey = `${(Math.random() * 1e9).toString(36)}`;
    this.state = {
      showCode: false,
    };
  }

  public componentDidMount() {
    if (this.dataSource) {
      // import('../../../src').then((Element: any) => {
      //   const args = ['context', 'React', 'ReactDOM']
      //   const argv = [this, React, ReactDOM]

      //   for (const key in Element) {
      //     args.push(key)
      //     argv.push(Element[key])
      //   }

      //   return {
      //     args,
      //     argv,
      //   }
      // }).then(({ args, argv }) => {
      //   // const code = transform(`
      //   //   class Demo extends React.Component {
      //   //     ${this.dataSource}
      //   //   }

      //   //   ReactDOM.render(<Demo {...context.props} />, document.getElementById('${this.contentKey}'))
      //   // `, 
      //   // {
      //   //   presets: ['es2015', 'react']
      //   // }).code;

      //   const code = transform(`
      //     ${this.dataSource
      //       .replace('dashkit-ui', '../../../src')
      //       .replace('mountNode', `document.getElementById(\'${this.contentKey}\')`)
      //     }
      //   `,
      //     {
      //       presets: ['es2015', 'react', 'stage-0'],
      //       plugins: [
      //         [
      //           "transform-decorators-legacy"
      //         ]
      //       ]
      //     }).code;

      //   args.push(code);

      //   new Function(...args).apply(null, argv);
      // })
      const code = transform(`
          ${this.dataSource
          .replace('dashkit-ui', '../../../src')
          .replace('mountNode', `document.getElementById(\'${this.contentKey}\')`)
        }
        `,
        {
          presets: ['es2015', 'react', 'stage-0'],
          plugins: [
            [
              "transform-decorators-legacy"
            ]
          ]
        }).code;
      console.log(code);
      new Function([code]).apply(this);
    }
  }
  public render() {
    const { dataMeta, dataSource } = this;
    const { showCode } = this.state;

    return (
      <div className="example">
        <div className="example-content" id={this.contentKey}></div>
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