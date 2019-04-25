import * as React from 'react';
import * as classNames from 'classnames';
import { isEqual } from 'lodash';
import { Provider as RadioProvider } from '../checkbox/context';

export type RadioGroupProps = {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  defaultValue?: any;
  value?: any;
  onChange?: (value: any) => void;
};

export type RadioGroupState = {
  value: any;
};

class RadioGroup extends React.PureComponent<RadioGroupProps, RadioGroupState> {
  static defaultProps = {
    prefixCls: 'dk-radio',
  };

  static getDerivedStateFromProps(nextProps: RadioGroupProps, prevState: RadioGroupState) {
    if (!isEqual(nextProps.value, prevState.value)) {
      return {
        value: nextProps.value
      }
    }
    return null;
  }

  constructor(props: RadioGroupProps) {
    super(props);

    const value = props.defaultValue || props.value;
    this.state = {
      value,
    };
  }

  render() {
    const { className, style, prefixCls, children } = this.props;
    const groupClassName = classNames(
      {
        [`${prefixCls}-group`]: true,
      },
      className,
    );

    return (
      <div className={groupClassName} style={style}>
        <RadioProvider
          value={{
            onRawChange: this.handleRawChange,
            checked: this.handleChecked
          }}
        >
          {children}
        </RadioProvider>
      </div>
    );
  }

  handleRawChange = (checked, value) => {
    const { onChange } = this.props;

    this.setState({
      value,
    });

    if (typeof onChange === 'function') {
      onChange(value);
    }
  }

  handleChecked = (value) => {
    return value === this.state.value;
  }
}

export default RadioGroup;
