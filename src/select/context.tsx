import * as React from 'react';
import { SelectContextProps } from './typings';

const context = React.createContext<Partial<SelectContextProps>>(null);
export const Provider = context.Provider;
export const Consumer = context.Consumer;
export const createConsumer = (Component: any) => (props: any) => (
  <Consumer>{(value: Partial<SelectContextProps>) => <Component {...props} {...value} />}</Consumer>
);
