import './style.scss';

import * as React from 'react';
import Page from '../common/page';

class PageSwitch extends React.PureComponent {
  render() {
    const markdownData = require(`../../../docs/en-US/switch.md`);
    return (
      <Page dataSource={markdownData} name="switch" />
    );
  }
}
export default PageSwitch;