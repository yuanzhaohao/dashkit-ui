import * as React from 'react';
import * as classNames from 'classnames';
import { createConsumer } from './context';

export type SidebarProps = {
  className?: string;
  addSidebar?: any;
  removeSidebar?: any;
};

const generateId = (() => {
  let i = 0;
  return (prefix: string = '') => {
    i += 1;
    return `${prefix}${i}`;
  };
})();

class Sidebar extends React.Component<SidebarProps> {
  uniqueId: string;
  constructor(props: SidebarProps) {
    super(props);
    this.uniqueId = generateId('dashkit-sidebar-');
  }

  componentDidMount() {
    if (this.props.addSidebar) {
      this.props.addSidebar(this.uniqueId);
    }
  }

  componentWillUnmount() {
    if (this.props.removeSidebar) {
      this.props.removeSidebar(this.uniqueId);
    }
  }

  render() {
    const { className, children, addSidebar, removeSidebar, ...attributes } = this.props;
    const layoutClassName = classNames(
      'dk-layout-sidebar',
      className,
    )
    return (
      <div {...attributes} className={layoutClassName}>{children}</div>
    );
  }
}

export default createConsumer(Sidebar);