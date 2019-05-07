export type BasicProps = {
  className?: string;
  prefixCls?: string;
};

export type CardProps = BasicProps & {
  collapse?: boolean;
  index?: string | number;
  visible?: boolean;
  onCollapse?: (index: string | number) => void;
};

export type CardState = {
  visible: boolean;
};

export type ContextProps = BasicProps & {
  collapse?: boolean,
  handleHeaderClick?: (key?: string | number) => void;
  onClick: () => void;
  visible?: boolean;
};

export type HeaderProps = BasicProps & ContextProps & {
  title?: string;
  key?: string | number;
};

export type BodyProps = BasicProps & ContextProps & {
};

export type AccordionProps = BasicProps & {
  className?: string;
  prefixCls?: string;
};

export type CollapseProps = BasicProps & {
  defaultActiveIndexs?: (string | number)[];
  activeIndexs?: (string | number)[];
};

export type CollapseState = {
  activeIndexs: (string | number)[];
};