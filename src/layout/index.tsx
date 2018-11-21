import './style.scss';
import * as classNames from 'classnames';
import * as PropTyps from 'prop-types';
import * as React from 'react';
import Sidebar from './sidebar';

export type LayoutProps = {
  prefixCls?: string;
  className?: string;
  hasSidebar?: boolean;
};
export type LayoutState = {
  sidebars?: string[];
};
export type BasicProps = {
  prefixCls?: string;
  className?: string;
};

class Layout extends React.Component<LayoutProps, LayoutState> {
  static Header: any;
  static Footer: any;
  static Content: any;
  static Sidebar: any;
  static childContextTypes = {
    sidebarHook: PropTyps.object,
  };
  static defaultProps = {
    prefixCls: 'dk-layout',
    hasSidebar: false,
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
    const { prefixCls, className, children, hasSidebar } = this.props;
    const layoutClassName = classNames(
      {
        [`${prefixCls}`]: true,
        [`${prefixCls}-has-sidebar`]: hasSidebar || this.state.sidebars.length > 0
      },
      className,
    )
    return (
      <div className={layoutClassName}>{children}</div>
    );
  }
}

function generator(cls: string) {
  return class Basic extends React.Component<BasicProps> {
    static defaultProps = {
      prefixCls: 'dk-layout',
    };
    render() {
      const { prefixCls, className, children } = this.props;
      const basicClassName = classNames(`${prefixCls}-${cls}`, className);
      return (
        <div className={basicClassName}>{children}</div>
      );
    }
  }
}

const Header = generator('header');
const Footer = generator('footer');
const Content = generator('content');

Layout.Header = Header;
Layout.Footer = Footer;
Layout.Content = Content;
Layout.Sidebar = Sidebar;

export default Layout;