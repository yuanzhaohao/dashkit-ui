import * as React from 'react';

type ContextProps = {
  prefixCls?: string;
};

const context = React.createContext<ContextProps>(null);
export const Provider = context.Provider;
export const Consumer = context.Consumer;
export const createConsumer = (Component: any) => (props: any) => (
  <Consumer>
    {(value: ContextProps) => <Component {...props} {...value} />}
  </Consumer>
);