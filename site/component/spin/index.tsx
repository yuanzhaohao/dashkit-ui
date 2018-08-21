import * as React from 'react';
import Page from '../common/page';
import './style.scss';

class PageButton extends React.PureComponent {
  render() {
    const markdownText = require(`../../../docs/en-US/spin.md`);
    return (
      <Page markdownText={markdownText} name="spin" />
    );
  }
}
export default PageButton;