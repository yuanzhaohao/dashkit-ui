import './style.scss';

import Page from '../common/page';

class PageSpin extends Page {
  document(locale: string) {
    return require(`../../../docs/spin/${locale}.md`)
  }
}

export default PageSpin;