import './style.scss';
import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as classNames from 'classnames';
import MenuItem from './menu-item';
import SubMenu from './sub-menu';

export type MenuProps = {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  defaultActive?: string;
  defaultOpeneds?: string[];
  mode?: 'horizontal' | 'vertical',
  theme?: 'dark' | 'light';
};

export type MenuState = {
  activeIndex?: string;
  openedMenus: string[];
};

class Menu extends React.PureComponent<MenuProps, MenuState> {
  static Item: any;
  static SubMenu: any;
  static defaultProps = {
    prefixCls: 'dk-menu',
    mode: 'horizontal',
    theme: 'light',
  };
  static childContextTypes = {
    itemHook: PropTypes.object,
  };

  constructor(props: MenuProps) {
    super(props);
    this.state = {
      activeIndex: props.defaultActive,
      openedMenus: props.defaultOpeneds || [],
    };
  }

  getChildContext() {
    return {
      itemHook: {
        selectItem: (index: string) => {
          const { activeIndex } = this.state;
          if (index !== activeIndex) {
            this.setState({
              activeIndex: index,
            });
          }
        },

        getState: () => {
          return this.state;
        }
      },

      subMenuHook: {
        addOpenedMenu: (index: string) => {
          const { openedMenus } = this.state;
          this.setState({
            openedMenus: [...new Set([...openedMenus, index])],
          });
        }
      }
    }
  }

  render() {
    const {
      children,
      prefixCls,
      style,
      className,
      theme,
    } = this.props;
    const menuClassName = classNames({
      [`${prefixCls}`]: true,
      [`${prefixCls}-dark`]: theme === 'dark',
    }, className);

    return (
      <ul className={menuClassName} style={style}>{children}</ul>
    );
  }
}

Menu.Item = MenuItem;
Menu.SubMenu = SubMenu;


export default Menu;