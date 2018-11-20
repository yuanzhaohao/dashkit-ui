import * as React from 'react';
import * as classNames from 'classnames';

export type SidebarProps = {
  className?: string;
};

const generateId = (() => {
  let i = 0;
  return (prefix: string = '') => {
    i += 1;
    return `${prefix}${i}`;
  };
})();

class Sidebar extends React.Component<SidebarProps> {
  static contextTypes = {
    sidebarHook: Object,
  };

  uniqueId: string;
  constructor(props: SidebarProps) {
    super(props);
    this.uniqueId = generateId('dashkit-sidebar-');
  }

  componentDidMount() {
    if (this.context.sidebarHook) {
      this.context.sidebarHook.addSidebar(this.uniqueId);
    }
  }

  componentWillUnmount() {
    if (this.context.sidebarHook) {
      this.context.sidebarHook.removeSidebar(this.uniqueId);
    }
  }

  render() {
    const { className, children, ...attributes } = this.props;
    const layoutClassName = classNames(
      'dk-layout-sidebar',
      className,
    )
    return (
      <div {...attributes} className={layoutClassName}>{children}</div>
    );
  }
}

export default Sidebar;