import './style.scss';

import Page from '../common/page';

class PageInput extends Page {
  document(locale: string) {
    return require(`../../../docs/input/${locale}.md`)
  }
}
export default PageInput;