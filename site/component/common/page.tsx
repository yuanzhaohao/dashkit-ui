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
    this.components = {};
    this.renderer = new marked.Renderer();
  }
  public componentDidMount() {
    Object.keys(this.components).forEach(key => {
      const div = document.getElementById(key);
      if (div instanceof HTMLElement) {
        ReactDOM.render(this.components[key], div);
      }
    });
  }
  public render() {
    return (
      <div className="app-page" dangerouslySetInnerHTML={this.getMarkdownText()} />
    )
  }

  private getMarkdownText() {
    const { markdownText, name } = this.props;
    let html = '';
    if (typeof markdownText === 'string') {
      const replaceText = markdownText.replace(/:::\s?example\s?([^]+?):::/g, (match, text, offset) => {
        const id = `${name}-${offset.toString(36)}`;

        this.components[id] = React.createElement(Example, {
          markdownText: text,
        });

        return `<div id=${id}></div>`;
      })
      html = marked(replaceText, { renderer: this.renderer });
    }
    return {
      __html: html,
    }
  }
}

export default Page;