import * as React from 'react';
import { SelectOptionProps } from './types';

const context = React.createContext<Partial<SelectOptionProps>>(null);
export const Provider = context.Provider;
export const Consumer = context.Consumer;
export const createConsumer = (Component: any) => (props: any) => (
  <Consumer>{(value: Partial<SelectOptionProps>) => <Component {...props} {...value} />}</Consumer>
);
