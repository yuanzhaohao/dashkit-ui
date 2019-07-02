import * as React from 'react';
import * as classNames from 'classnames';
import Sidebar from './sidebar';
import { LayoutProvider } from './context';

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
  public static Header: typeof Header;
  public static Footer: typeof Footer;
  public static Content: typeof Content;
  public static Sidebar: typeof Sidebar;
  public static defaultProps = {
    prefixCls: 'dk-layout',
    hasSidebar: false,
  };

  public state = {
    sidebars: [],
  };

  public render() {
    const { prefixCls, className, children, hasSidebar, ...attibutes } = this.props;
    const layoutClassName = classNames(
      {
        [`${prefixCls}`]: true,
        [`${prefixCls}-has-sidebar`]: hasSidebar || this.state.sidebars.length > 0,
      },
      className,
    );
    return (
      <div className={layoutClassName} {...attibutes}>
        <LayoutProvider value={this.getLayoutContext()}>{children}</LayoutProvider>
      </div>
    );
  }

  public getLayoutContext() {
    return {
      addSidebar: (id: string) => {
        this.setState({
          sidebars: [...this.state.sidebars, id],
        });
      },
      removeSidebar: (id: string) => {
        this.setState({
          sidebars: this.state.sidebars.filter(currentId => currentId !== id),
        });
      },
    };
  }
}

function generator(cls: string) {
  return class Basic extends React.Component<BasicProps> {
    public static defaultProps = {
      prefixCls: 'dk-layout',
    };
    public render() {
      const { prefixCls, className, children, ...attibutes } = this.props;
      const basicClassName = classNames(`${prefixCls}-${cls}`, className);
      return (
        <div className={basicClassName} {...attibutes}>
          {children}
        </div>
      );
    }
  };
}

const Header = generator('header');
const Footer = generator('footer');
const Content = generator('content');

Layout.Header = Header;
Layout.Footer = Footer;
Layout.Content = Content;
Layout.Sidebar = Sidebar;

export default Layout;
