import * as React from 'react';

export type RadioGroupProps = {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  defaultValue?: string[];
  value?: string[];
  min?: number;
  max?: number;
  onChange?: (options: string[]) => void;
};

export type RadioGroupState = {
  options: string[];
};

class RadioGroup extends React.PureComponent<RadioGroupProps, RadioGroupState> {
  static defaultProps = {
    prefixCls: 'dk-radio',
    value: [],
  };

  render() {
    return null;
  }
}

export default RadioGroup;
