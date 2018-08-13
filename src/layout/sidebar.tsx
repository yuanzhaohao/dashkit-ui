import * as classNames from 'classnames';
import * as React from 'react';

export type SidebarProps = {
  className?: string;
};

class Sidebar extends React.Component<SidebarProps> {
  static Header: any;
  static Footer: any;
  static Content: any;
  static Sider: any;
  render() {
    const { className, children, hasSider, ...others } = this.props;
    const layoutClassName = classNames(
      'dashkit-layout',
      className,
    )
    return <div className={layoutClassName} {...others}>{children}</div>;
  }
}

export default Sidebar;