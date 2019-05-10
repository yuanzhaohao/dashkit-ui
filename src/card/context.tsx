import * as React from 'react';
import { ContextProps } from './types';

const context = React.createContext<Partial<ContextProps>>(null);
export const Provider = context.Provider;
export const Consumer = context.Consumer;
export const createConsumer = (Component: any) => (props: any) => (
  <Consumer>{(value: Partial<ContextProps>) => <Component {...props} {...value} />}</Consumer>
);
