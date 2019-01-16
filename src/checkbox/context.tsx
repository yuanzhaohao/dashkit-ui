import * as React from 'react';
import createReactContext from 'create-react-context';
import { CheckboxProps } from './checkbox';


const CheckboxContext = createReactContext<CheckboxProps | null>(null);
export const CheckboxProvider = CheckboxContext.Provider;
export const CheckboxConsumer = CheckboxContext.Consumer;
export const createConsumer = (Component: any) => (props: any) => (
  <CheckboxConsumer>
    {(context: any) => <Component {...props} rootContext={context} />}
  </CheckboxConsumer>
);