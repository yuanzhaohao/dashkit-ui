import './style.scss';

import * as React from 'react';
import Page from '../common/page';

class PageIcon extends React.PureComponent {
  render() {
    const markdownText = require(`../../../docs/en-US/icon.md`);
    return (
      <Page markdownText={markdownText} name="icon" />
    );
  }
}
export default PageIcon;