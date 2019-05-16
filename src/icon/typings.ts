import { default as typesObj } from './types';

let types = [];
Object.keys(typesObj).forEach((key: string) => {
  types = types.concat(typesObj[key]);
});

export type IconProps = {
  prefixCls?: string;
  type: (typeof types)[number];
  className?: string;
  disabled?: boolean;
};

export { types };
