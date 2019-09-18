import * as React from 'react';
import Item, { InputProps } from './item';
import CheckboxGroup from './group';

class Checkbox extends React.PureComponent<InputProps> {
  public static componentType = 'Checkbox';
  public static Group: typeof CheckboxGroup;
  public static defaultProps = {
    prefixCls: 'dk-checkbox',
    type: 'checkbox',
  };

  public render() {
    return <Item {...this.props} />;
  }
}

export default Checkbox;
