import './style.scss';

import * as React from 'react';
import * as classNames from 'classnames';
import { MenuProvider } from './context';
import MenuItem from './item';
import ItemGroup from './item-group';
import SubMenu from './sub-menu';
import { MenuProps, MenuState } from './typings';

class Menu extends React.PureComponent<MenuProps, MenuState> {
  public static Item: typeof MenuItem;
  public static ItemGroup: typeof ItemGroup;
  public static SubMenu: typeof SubMenu;
  public static defaultProps = {
    prefixCls: 'dk-menu',
    mode: 'vertical',
    theme: 'light',
  };

  public static getDerivedStateFromProps(nextProps: MenuProps) {
    if ('activeKey' in nextProps) {
      return {
        activeIndex: nextProps.activeKey,
      };
    }
    return null;
  }

  constructor(props: MenuProps) {
    super(props);
    this.state = {
      activeIndex: props.activeKey || props.defaultActiveKey,
      openedMenus: props.defaultOpenKeys || [],
    };
  }

  public render() {
    const {
      children,
      prefixCls,
      className,
      onOpen,
      onSelect,
      theme,
      mode,
      defaultActiveKey,
      defaultOpenKeys,
      ...attributes
    } = this.props;
    const menuClassName = classNames(
      {
        [`${prefixCls}`]: true,
        [`${prefixCls}-vertical`]: mode === 'vertical',
        [`${prefixCls}-horizontal`]: mode === 'horizontal',
        [`${prefixCls}-dark`]: theme === 'dark',
      },
      className,
    );

    return (
      <ul className={menuClassName} {...attributes}>
        <MenuProvider value={this.getMenuContext()}>{children}</MenuProvider>
      </ul>
    );
  }

  public getMenuContext() {
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
      },
    };
  }
}

Menu.Item = MenuItem;
Menu.SubMenu = SubMenu;
Menu.ItemGroup = ItemGroup;

export default Menu;
