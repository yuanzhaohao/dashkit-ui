import './style.scss';
import * as classNames from 'classnames';
import * as React from 'react';

export type LayoutProps = {
  className?: string;
  hasSider?: boolean;
};
export type BasicProps = {
  className?: string;
};

class Layout extends React.Component<LayoutProps> {
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

function generator(classname: string) {
  return class Basic extends React.Component<BasicProps> {
    render() {
      const { className, children, ...others } = this.props;
      const basicClassName = classNames(classname, className);
      return (
        <div className={basicClassName} {...others}>{children}</div>
      );
    }
  }
}

const Header = generator('dashkit-layout-header');
const Footer = generator('dashkit-layout-footer');
const Content = generator('dashkit-layout-content');

Layout.Header = Header;
Layout.Footer = Footer;
Layout.Content = Content;

export default Layout;
