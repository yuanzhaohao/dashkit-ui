import './style.scss';

import * as React from 'react';
import Page from '../common/page';

class PageSpin extends React.PureComponent {
  render() {
    const markdownText = require(`../../../docs/en-US/spin.md`);
    return (
      <Page markdownText={markdownText} name="spin" />
    );
  }
}
export default PageSpin;