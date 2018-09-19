import './style.scss';
import Page from '../common/page';

class PageAlert extends Page {
  document(locale: string) {
    return require(`../../../docs/alert/${locale}.md`)
  }
}

export default PageAlert;