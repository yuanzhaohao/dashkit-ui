import './style.scss';

import * as React from 'react';
import Page from '../common/page';

class PageSwitch extends React.PureComponent {
  render() {
    const locale = 'en-US';
    const dataSource = require(`../../../docs/switch/${locale}.md`);
    return (
      <Page dataSource={dataSource} locale={locale} name="switch" />
    );
  }
}
export default PageSwitch;