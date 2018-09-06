import './style.scss';

import * as React from 'react';
import Page from '../common/page';

class PageSpin extends React.PureComponent {
  render() {
    const locale = 'en-US';
    const dataSource = require(`../../../docs/spin/${locale}.md`);
    return (
      <Page dataSource={dataSource} locale={locale} name="spin" />
    );
  }
}
export default PageSpin;