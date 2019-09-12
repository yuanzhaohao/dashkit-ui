import * as React from 'react';
import * as classNames from 'classnames';
import { isEqual } from 'lodash-es';
import { Provider as RadioProvider } from '../checkbox/context';

export type RadioGroupProps = {
  prefixCls?: string;
  className?: string;
  name?: string;
  defaultValue?: any;
  value?: any;
  onChange?: (value: any) => void;
};

export type RadioGroupState = {
  value: any;
};

class RadioGroup extends React.PureComponent<RadioGroupProps, RadioGroupState> {
  public static componentType = 'RadioGroup';
  public static defaultProps = {
    prefixCls: 'dk-radio',
  };

  public static getDerivedStateFromProps(nextProps: RadioGroupProps, prevState: RadioGroupState) {
    if (!isEqual(nextProps.value, prevState.value)) {
      return {
        value: nextProps.value,
      };
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

  public render() {
    const {
      className,
      prefixCls,
      children,
      onChange,
      value,
      defaultValue,
      ...attibutes
    } = this.props;
    const groupClassName = classNames(
      {
        [`${prefixCls}-group`]: true,
      },
      className,
    );

    return (
      <div className={groupClassName} {...attibutes}>
        <RadioProvider
          value={{
            onRawChange: this.handleRawChange,
            checked: this.handleChecked,
          }}
        >
          {children}
        </RadioProvider>
      </div>
    );
  }

  public handleRawChange = (checked, value) => {
    const { onChange } = this.props;

    this.setState({
      value,
    });

    if (typeof onChange === 'function') {
      onChange(value);
    }
  };

  public handleChecked = value => {
    return value === this.state.value;
  };
}

export default RadioGroup;
