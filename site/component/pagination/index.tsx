import './style.scss';

import * as React from 'react';
import Page from '../common/page';

class PagePagination extends React.PureComponent {
  render() {
    const locale = 'en-US';
    const dataSource = require(`../../../docs/pagination/${locale}.md`);
    return (
      <Page dataSource={dataSource} locale={locale} name="pagination" />
    );
  }
}
export default PagePagination;