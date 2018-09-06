import './style.scss';

import * as React from 'react';
import Page from '../common/page';

const pageData = {
  media: [
    'fast-forward',
    'pause-circle',
    'pause',
    'play-circle',
    'play',
    'repeat',
    'rewind',
    'shuffle',
    'skip-back',
    'skip-forward',
    'stop-circle',
    'volume-1',
    'volume-2',
    'volume-x',
    'volume',
  ]
};
class PageIcon extends React.PureComponent {
  render() {
    const locale = 'en-US';
    const dataSource = require(`../../../docs/icon/${locale}.md`);
    return (
      <Page dataSource={dataSource} locale={locale} name="icon" />
    );
  }
}
export default PageIcon;