import * as React from 'react';
import createReactContext from 'create-react-context';
import { CheckboxProps } from './checkbox';

const { Provider, Consumer } = createReactContext<CheckboxProps | null>(null);
const createConsumer = (Component: any) => () => (
  <Consumer>{(context) => <Component { ...context } />}</Consumer>
);

export { Provider, Consumer, createConsumer };
