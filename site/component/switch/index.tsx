import './style.scss';

import * as React from 'react';
import Page from '../common/page';

class PageSwitch extends React.PureComponent {
  render() {
    const markdownText = require(`../../../docs/en-US/switch.md`);
    return (
      <Page markdownText={markdownText} name="switch" />
    );
  }
}
export default PageSwitch;