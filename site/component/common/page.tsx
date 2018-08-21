import * as React from 'react';
import './page.scss';

type Props = {
  title?: string;
  desc?: string;
};

class Page extends React.PureComponent<Props> {
  render() {

    return (
      <div className="app-page">

      </div>
    )
  }
}

export default Page;