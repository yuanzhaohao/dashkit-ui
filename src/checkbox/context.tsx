import * as React from 'react';
import { CheckboxProps } from './checkbox';
const { Provider, Consumer } = React.createContext<CheckboxProps | null>(null);

const createConsumer = (Component: any) => () => (
  <Consumer>{(context) => <Component { ...context } />}</Consumer>
);

export { Provider, createConsumer };
