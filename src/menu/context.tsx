import * as React from 'react';
const MenuContext = React.createContext<any>(null);

export const MenuProvider = MenuContext.Provider;
export const MenuConsumer = MenuContext.Consumer;
export const createConsumer = (Component: any) => (props: any) => (
  <MenuConsumer>
    {(context: any) => <Component {...props} rootContext={context} />}
  </MenuConsumer>
);
