import * as React from 'react';
import Item, { InputProps } from './item';

class Checkbox extends React.PureComponent<InputProps> {
  public static Group: any;
  public static defaultProps = {
    prefixCls: 'dk-checkbox',
    type: 'checkbox',
  };

  public render() {
    return <Item {...this.props} />;
  }
}

export default Checkbox;
