import * as React from 'react';
import Example from './example';
import './page.scss';

type Props = {
  dataSource: {
    basic: string;
    demos: any;
  };
  name?: string;
  pageData?: any;
};

class Page extends React.PureComponent<Props> {
  public render() {
    const { basic, demos } = this.props.dataSource;

    return (
      <div className="app-page">
        <div className="app-page-info" dangerouslySetInnerHTML={{
          __html: basic
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