import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Example from './example';
import './page.scss';

type Props = {
  dataSource: any;
  name?: string;
  locale?: string;
};

class Page extends React.PureComponent<Props> {
  public componentDidMount() {
    const { dataSource, name, locale } = this.props;
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

  public render() {
    const { dataSource } = this.props;

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