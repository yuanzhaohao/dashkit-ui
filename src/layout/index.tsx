import './style.scss';
import * as classNames from 'classnames';
import * as React from 'react';
import * as PropTypes from 'prop-types';
import Sidebar from './sidebar';

export type LayoutProps = {
  className?: string;
  hasSidebar?: boolean;
};
export type LayoutState = {
  sidebars?: string[];
};
export type BasicProps = {
  className?: string;
};

class Layout extends React.Component<LayoutProps, LayoutState> {
  static Header: React.ReactNode;
  static Footer: React.ReactNode;
  static Content: React.ReactNode;
  static Sidebar: React.ReactNode;
  static childContextTypes = {
    sidebarHook: PropTypes.object,
  };
  state = {
    sidebars: [],
  };
  getChildContext() {
    return {
      sidebarHook: {
        addSidebar: (id: string) => {
          this.setState({
            sidebars: [...this.state.sidebars, id],
          });
        },
        removeSidebar: (id: string) => {
          this.setState({
            sidebars: this.state.sidebars.filter(currentId => currentId !== id),
          });
        }
      }
    };
  }
  render() {
    const { className, children, hasSidebar, ...attributes } = this.props;
    const layoutClassName = classNames(
      'dashkit-layout',
      {
        'dashkit-layout-has-sidebar': hasSidebar || this.state.sidebars.length > 0
      },
      className,
    )
    return (
      <div {...attributes} className={layoutClassName}>{children}</div>
    );
  }
}

function generator(classname: string) {
  return class Basic extends React.Component<BasicProps> {
    render() {
      const { className, children, ...attributes } = this.props;
      const basicClassName = classNames(classname, className);
      return (
        <div {...attributes} className={basicClassName}>{children}</div>
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
Layout.Sidebar = Sidebar;

export default Layout;