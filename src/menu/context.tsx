import * as React from 'react';
import { MenuProps } from './index';
const { Provider, Consumer } = React.createContext<MenuProps | null>(null);

const createConsumer = (Component: any) => () => (
  <Consumer>{(context) => <Component {...context} />}</Consumer>
);

export { Provider, Consumer, createConsumer };
