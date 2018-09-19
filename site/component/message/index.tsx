import './style.scss';

import Page from '../common/page';

class PageMessage extends Page {
  document(locale: string) {
    return require(`../../../docs/message/${locale}.md`)
  }
}
export default PageMessage;