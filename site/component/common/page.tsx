import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as marked from 'marked';
import Example from './example';
import './page.scss';

type Props = {
  dataSource: {
    markdown: string;
    demos: any;
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
    // const { example } = this.props.dataSource;

    // if (example) {
    //   for (const key in example) {
    //     const div = document.getElementById(key);
    //     console.log(example);
    //     const Element = React.createElement(Example, {
    //       dataSource: example[key],
    //     });
    //     ReactDOM.render(Element, div);
    //   }
    // }
  }
  public render() {
    const { markdown, demos } = this.props.dataSource;

    return (
      <div className="app-page">
        <div className="app-page-info" dangerouslySetInnerHTML={{
          __html: marked(markdown, { renderer: new marked.Renderer })
        }} />
        {demos && demos.length
          ? demos.map((demo: any, key: number) =>
              <Example key={key} dataSource={demo} />
            )
          : null
        }
      </div>
    )
  }
}

export default Page;