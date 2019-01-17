import * as React from 'react';
import Item, { InputProps } from './item';

class Checkbox extends React.PureComponent<InputProps> {
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
