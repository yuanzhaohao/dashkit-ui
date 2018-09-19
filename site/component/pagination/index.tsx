import './style.scss';

import Page from '../common/page';

class PagePagination extends Page {
  document(locale: string) {
    return require(`../../../docs/pagination/${locale}.md`)
  }
}
export default PagePagination;