import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Example from './example';
import './page.scss';

class Page extends React.PureComponent {
  locale: string;
  dataSource: any;
  constructor(props: any) {
    super(props);
    this.locale = window.localStorage.getItem('DASHKIT_UI_LOCALE') || 'en-US';
    this.dataSource = this.document(this.locale);
  }
  componentDidMount() {
    const { dataSource, locale } = this;
    const demoElement = document.getElementById('demos');

    console.log(dataSource)
    if (demoElement && dataSource.demos && Object.keys(dataSource.demos)) {
      const children: any[] = [];
      const demoData = Object.keys(dataSource.demos)
        .map(key => dataSource.demos[key])
        .sort((a, b) => a.meta.order - b.meta.order);

      demoData.forEach((d, key) => {
        const child = (
          <Example
            key={key}
            locale={locale}
            dataSource={d}
          />
        );
        children.push(child);
      });

      ReactDOM.render(children, demoElement);
    }
  }

  render() {
    const { dataSource } = this;

    return (
      <div className="app-page">
        <div className="app-page-info" dangerouslySetInnerHTML={{
          __html: dataSource.markdown
        }} />
      </div>
    )
  }
}

export default Page;