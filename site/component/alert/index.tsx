import './style.scss';

import * as React from 'react';
import Page from '../common/page';

class PageAlert extends React.PureComponent {
  render() {
    const locale = 'en-US';
    const dataSource = require(`../../../docs/alert/${locale}.md`);
    return (
      <Page dataSource={dataSource} locale={locale} name="alert" />
    );
  }
}
export default PageAlert;