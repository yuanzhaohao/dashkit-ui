import * as React from 'react';
import { CheckboxProps } from './types';
import Item from './item';

class Checkbox extends React.PureComponent<CheckboxProps> {
  static Group: any;
  static defaultProps = {
    prefixCls: 'dk-checkbox',
    type: 'checkbox',
  };

  render() {
    return (
      <Item {...this.props} />
    );
  }
}

export default Checkbox;
