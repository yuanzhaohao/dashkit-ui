import * as React from 'react';
import Item, { InputProps } from '../checkbox/item';

class Radio extends React.PureComponent<InputProps> {
  public static Group: any;
  public static defaultProps = {
    prefixCls: 'dk-radio',
    type: 'radio',
  };

  public render() {
    return <Item {...this.props} />;
  }
}

export default Radio;
