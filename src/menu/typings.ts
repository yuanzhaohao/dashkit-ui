export type MenuItemProps = {
  prefixCls?: string;
  className?: string;
  index: string;
  disabled?: boolean;
  icon?: string;
  rootContext: any;
};

export type MenuProps = {
  prefixCls?: string;
  className?: string;
  activeKey?: string;
  defaultActiveKey?: string;
  defaultOpenKeys?: string[];
  mode: 'horizontal' | 'vertical';
  theme: 'dark' | 'light';
  onSelect?: (index: string) => void;
  onOpen?: (index: string) => void;
};

export type MenuState = {
  activeIndex?: string;
  openedMenus: string[];
};

export type MenuItemGroupProps = {
  prefixCls: string;
  className: string;
  title: string;
  children: JSX.Element[] | JSX.Element;
};

export type SubMenuProps = {
  prefixCls?: string;
  className?: string;
  index: string;
  icon?: string;
  title?: string;
  rootContext: any;
};

export type SubMenuState = {
  active: boolean;
};
