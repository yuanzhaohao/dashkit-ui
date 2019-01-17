import * as React from 'react';
import Item, { InputProps } from '../checkbox/item';

class Checkbox extends React.PureComponent<InputProps> {
  static Group: any;
  static defaultProps = {
    prefixCls: 'dk-radio',
    type: 'radio',
  };

  render() {
    return (
      <Item {...this.props} />
    );
  }
}

export default Checkbox;
