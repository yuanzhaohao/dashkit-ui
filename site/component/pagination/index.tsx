import './style.scss';

import * as React from 'react';
import Page from '../common/page';

class PagePagination extends React.PureComponent {
  render() {
    const markdownText = require(`../../../docs/en-US/pagination.md`);
    return (
      <Page dataSource={markdownText} name="pagination" />
    );
  }
}
export default PagePagination;