import './style.scss';

import * as React from 'react';
import Page from '../common/page';

class PageInput extends React.PureComponent {
  render() {
    const locale = 'en-US';
    const dataSource = require(`../../../docs/input/${locale}.md`);
    return (
      <Page dataSource={dataSource} locale={locale} name="input" />
    );
  }
}
export default PageInput;