import * as React from 'react';
// import createReactContext from 'create-react-context';

type ContextProps = {
  onRawChange?: (checked?: boolean, label?: string) => void;
  checked?: boolean | ((value: any) => boolean);
  options?: string[];
  min?: number;
  max?: number;
};

const context = React.createContext<ContextProps>(null);
export const Provider = context.Provider;
export const Consumer = context.Consumer;
export const createConsumer = (Component: any) => (props: any) => (
  <Consumer>
    {(value: ContextProps) => <Component {...props} {...value} />}
  </Consumer>
);