import './style.scss';

import * as React from 'react';
import * as classNames from 'classnames';
import { MenuProvider } from './context';
import MenuItem from './item';
import ItemGroup from './item-group';
import SubMenu from './sub-menu';

export type MenuProps = {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  active?: string;
  defaultActive?: string;
  defaultOpeneds?: string[];
  mode: 'horizontal' | 'vertical',
  theme: 'dark' | 'light';
  onSelect?: (index: string) => void;
  onOpen?: (index: string) => void;
};

export type MenuState = {
  activeIndex?: string;
  openedMenus: string[];
};

class Menu extends React.PureComponent<MenuProps, MenuState> {
  static Item: typeof MenuItem;
  static ItemGroup: typeof ItemGroup;
  static SubMenu: typeof SubMenu;
  static defaultProps = {
    prefixCls: 'dk-menu',
    mode: 'vertical',
    theme: 'light',
  };

  static getDerivedStateFromProps(nextProps: MenuProps) {
    if ('active' in nextProps) {
      return {
        activeIndex: nextProps.active,
      }
    }
    return null;
  }

  constructor(props: MenuProps) {
    super(props);
    this.state = {
      activeIndex: props.active || props.defaultActive,
      openedMenus: props.defaultOpeneds || [],
    };
  }

  render() {
    const { children, prefixCls, className, style, theme, mode } = this.props;
    const menuClassName = classNames({
      [`${prefixCls}`]: true,
      [`${prefixCls}-vertical`]: mode === 'vertical',
      [`${prefixCls}-horizontal`]: mode === 'horizontal',
      [`${prefixCls}-dark`]: theme === 'dark',
    }, className);

    return (
      <ul className={menuClassName} style={style}>
        <MenuProvider value={this.getMenuContext()}>{children}</MenuProvider>
      </ul>
    );
  }

  getMenuContext() {
    return {
      getState: () => {
        return this.state;
      },
      getProps: () => {
        return this.props;
      },
      selectItem: (index: string) => {
        const { activeIndex } = this.state;
        const { onSelect } = this.props;
        if (index !== activeIndex) {
          this.setState({
            activeIndex: index,
          });
          if (typeof onSelect === 'function') {
            onSelect(index);
          }
        }
      },
      addOpenedMenu: (index: string) => {
        const { openedMenus } = this.state;
        const { onOpen } = this.props;
        this.setState({
          openedMenus: Array.from(new Set([...openedMenus, index])),
        });

        if (typeof onOpen === 'function') {
          onOpen(index);
        }
      },

      removeOpenedMenu: (index: string) => {
        const { openedMenus } = this.state;
        this.setState({
          openedMenus: openedMenus.filter(m => m !== index),
        });
      },

      existOpenedMenu: (index: string) => {
        return this.state.openedMenus.indexOf(index) !== -1;
      }
    };
  }
}

Menu.Item = MenuItem;
Menu.SubMenu = SubMenu;
Menu.ItemGroup = ItemGroup;

export default Menu;