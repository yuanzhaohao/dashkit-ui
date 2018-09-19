import './style.scss';

import Page from '../common/page';

class PageSwitch extends Page {
  document(locale: string) {
    return require(`../../../docs/switch/${locale}.md`)
  }
}
export default PageSwitch;