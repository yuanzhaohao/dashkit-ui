import * as React from 'react';
import createReactContext from 'create-react-context';

const MenuContext = createReactContext<any>(null);

export const MenuProvider = MenuContext.Provider;
export const MenuConsumer = MenuContext.Consumer;
export const createConsumer = (Component: any) => (props: any) => (
  <MenuConsumer>
    {(context: any) => <Component {...props} rootContext={context} />}
  </MenuConsumer>
);
