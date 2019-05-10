import * as React from 'react';
import createReactContext from 'create-react-context';

const LayoutContext = createReactContext<any>(null);

export const LayoutProvider = LayoutContext.Provider;
export const LayoutConsumer = LayoutContext.Consumer;
export const createConsumer = (Component: any) => (props: any) => (
  <LayoutConsumer>
    {(context: any) => (
      <Component {...props} addSidebar={context.addSidebar} removeSidebar={context.removeSidebar} />
    )}
  </LayoutConsumer>
);
