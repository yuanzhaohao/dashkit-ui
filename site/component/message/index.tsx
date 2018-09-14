import './style.scss';

import * as React from 'react';
import Page from '../common/page';

class PageMessage extends React.PureComponent {
  render() {
    const locale = 'en-US';
    const dataSource = require(`../../../docs/message/${locale}.md`);
    return (
      <Page dataSource={dataSource} locale={locale} name="message" />
    );
  }
}
export default PageMessage;