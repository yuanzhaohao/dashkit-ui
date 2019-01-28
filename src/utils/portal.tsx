import * as React from 'react';
import { createPortal } from 'react-dom';

export type PortalProps = {
  visible?: boolean;
};

class Portal extends React.PureComponent<PortalProps> {
  render() {
    const { visible, children } = this.props;
    return visible ? createPortal(children, document.body) : null;
  }
}

export default Portal;