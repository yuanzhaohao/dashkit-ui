import './style.scss';

import * as React from 'react';
import Page from '../common/page';

class PageButton extends React.PureComponent {
  render() {
    const locale = 'en-US';
    const dataSource = require(`../../../docs/button/${locale}.md`);
    return (
      <Page dataSource={dataSource} locale={locale} name="button" />
    );
  }
}
export default PageButton;