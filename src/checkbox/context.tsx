import * as React from 'react';
import createReactContext from 'create-react-context';

type ContextProps = {
  onRawChange: (checked?: boolean, label?: string) => void;
};

const CheckboxContext = createReactContext<ContextProps>(null);
export const CheckboxProvider = CheckboxContext.Provider;
export const CheckboxConsumer = CheckboxContext.Consumer;
export const createConsumer = (Component: any) => (props: any) => (
  <CheckboxConsumer>
    {(value: any) => <Component {...props} {...value} />}
  </CheckboxConsumer>
);