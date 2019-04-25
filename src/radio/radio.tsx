import * as React from 'react';
import Item, { InputProps } from '../checkbox/item';

class Radio extends React.PureComponent<InputProps> {
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

export default Radio;
