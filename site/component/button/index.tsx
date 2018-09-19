import './style.scss';

import Page from '../common/page';

class PageButton extends Page {
  document(locale: string) {
    return require(`../../../docs/button/${locale}.md`)
  }
}
export default PageButton;