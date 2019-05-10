import * as React from 'react';
import * as classNames from 'classnames';
import { isEqual } from 'lodash-es';
import { Provider as CheckboxProvider } from './context';

export type CheckboxGroupProps = {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  defaultValue?: string[];
  value?: string[];
  min?: number;
  max?: number;
  onChange?: (options: string[]) => void;
};

export type CheckboxGroupState = {
  options: string[];
};

class CheckboxGroup extends React.PureComponent<CheckboxGroupProps, CheckboxGroupState> {
  public static defaultProps = {
    prefixCls: 'dk-checkbox',
    value: [],
  };

  public static getDerivedStateFromProps(
    nextProps: CheckboxGroupProps,
    prevState: CheckboxGroupState,
  ) {
    if (!isEqual(nextProps.value, prevState.options)) {
      return {
        options: nextProps.value,
      };
    }
    return null;
  }

  constructor(props: CheckboxGroupProps) {
    super(props);

    const options = props.defaultValue || props.value || [];
    this.state = {
      options,
    };
  }

  public render() {
    const { className, style, prefixCls, children, min, max } = this.props;
    const { options } = this.state;
    const groupClassName = classNames(
      {
        [`${prefixCls}-group`]: true,
      },
      className,
    );

    return (
      <div className={groupClassName} style={style}>
        <CheckboxProvider
          value={{
            onRawChange: this.handleRawChange,
            checked: this.handleChecked,
            options,
            min,
            max,
          }}
        >
          {children}
        </CheckboxProvider>
      </div>
    );
  }

  public handleRawChange = (checked: boolean, value) => {
    const { options } = this.state;
    const { onChange } = this.props;
    const newOptions = !!checked
      ? Array.from(new Set([...options, value]))
      : options.filter(option => option !== value);

    this.setState({
      options: newOptions,
    });

    if (typeof onChange === 'function') {
      onChange(newOptions);
    }
  };

  public handleChecked = value => {
    const { options } = this.state;

    return options.indexOf(value) !== -1;
  };
}

export default CheckboxGroup;
