import './style.scss';

import * as React from 'react';
import Page from '../common/page';

class PageButton extends React.PureComponent {
  render() {
    const markdownText = require(`../../../docs/en-US/button.md`);
    return (
      <Page dataSource={markdownText} name="button" />
    );
  }
}
export default PageButton;