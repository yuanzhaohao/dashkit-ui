import './style.scss';

import * as React from 'react';
import Tooltip, { TooltipProps } from '../tooltip';

class Popover extends React.PureComponent<TooltipProps> {
  static defaultProps = {
    prefixCls: 'dk-popover',
    placement: 'top',
    trigger: 'click',
  };

  render() {
    return (
      <Tooltip {...this.props} />
    );
  }
}

export default Popover;
