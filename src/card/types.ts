export type BasicProps = {
  className?: string;
  prefixCls?: string;
};

export type CardProps = BasicProps & {
  collapse?: boolean;
  key?: string | number;
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
  defaultActiveKey?: string[];
};

export type CollapseState = {
  activeKey: string[];
};