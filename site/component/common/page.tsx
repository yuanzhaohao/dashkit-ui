import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as marked from 'marked';
import Example from './example';
import './page.scss';

type Props = {
  dataSource: {
    markdown: string;
    picked: any;
  };
  name?: string;
  pageData?: any;
};

class Page extends React.PureComponent<Props> {
  private renderer: any;
  private components: any;
  constructor(props: Props) {
    super(props);
    this.components = [];
    this.renderer = new marked.Renderer();
  }
  public componentDidMount() {
    const { picked } = this.props.dataSource;

    if (picked) {
      for (const key in picked) {
        const div = document.getElementById(key);
        console.log(picked);
        const Element = React.createElement(Example, {
          dataSource: picked[key],
        });
        ReactDOM.render(Element, div);
      }
    }
    

    // if (this.components.length && contentElement instanceof HTMLElement) {
    //   ReactDOM.render(this.components, contentElement);
      
    // }
  }
  public render() {
    return (
      <div className="app-page">
        <div className="app-page-info" dangerouslySetInnerHTML={this.getMarkdownText()} />
        <div className="app-page-content" ref="content" />
      </div>
    )
  }
  private getMarkdownText() {
    const { dataSource, name } = this.props;
    let html = '';
    console.log(dataSource);
    if (typeof dataSource.markdown === 'string') {
      // this.components = [];
      // const reg = /:::\s?example\s?([^]+?):::/g;
      // const replaceText = markdownText.markdown.replace(reg, (match, text, offset) => {
      //   const key = `${name}-${offset.toString(36)}`;
      //   const attributes = {
      //     ...this.props,
      //     markdownText: text,
      //     key: key,
      //   }
      //   this.components.push(
      //     React.createElement(Example, attributes)
      //   );
      //   return '';
      // });

      html = marked(dataSource.markdown, { renderer: this.renderer });
    }
    return {
      __html: html,
    }
  }
}

export default Page;