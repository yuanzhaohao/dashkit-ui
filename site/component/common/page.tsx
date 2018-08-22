import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as marked from 'marked';
import Example from './example';
import './page.scss';

type Props = {
  markdownText?: string;
  name?: string;
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
    const contentElement = this.refs.content;
    if (this.components.length && contentElement instanceof HTMLElement) {
      ReactDOM.render(this.components, contentElement);
    }
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
    const { markdownText, name } = this.props;
    let html = '';
    if (typeof markdownText === 'string') {
      this.components = [];
      const reg = /:::\s?example\s?([^]+?):::/g;
      const replaceText = markdownText.replace(reg, (match, text, offset) => {
        const key = `${name}-${offset.toString(36)}`;
        this.components.push(
          React.createElement(Example, {
            markdownText: text,
            key: key,
          })
        );
        return '';
      });

      html = marked(replaceText, { renderer: this.renderer });
    }
    return {
      __html: html,
    }
  }
}

export default Page;