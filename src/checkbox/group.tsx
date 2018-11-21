import * as React from 'react';
import * as classNames from 'classnames';
import * as PropTyps from 'prop-types';
import { isEqual } from 'lodash';
import { CheckboxProps } from './checkbox';
import { Provider } from './context';

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
  static defaultProps = {
    prefixCls: 'dk-checkbox',
    value: [],
  };

  static childContextTypes = {
    groupHook: PropTyps.object,
  };

  static getDerivedStateFromProps(nextProps: CheckboxGroupProps, prevState: CheckboxGroupState) {
    if (!isEqual(nextProps.value, prevState.options)) {
      return {
        options: nextProps.value
      }
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

  getChildContext() {
    return {
      groupHook: {
        getOptions: () => {
          return this.state.options;
        },
        getMin: () => {
          return this.props.min;
        },
        getMax: () => {
          return this.props.max;
        }
      },
    }
  }

  render() {
    const { className, style, prefixCls, children } = this.props;
    const { options } = this.state;
    const groupClassName = classNames(
      {
        [`${prefixCls}-group`]: true,
      },
      className,
    );

    const realChildren = React.Children.map(children, (child: React.ReactElement<CheckboxProps>, index) => {
      if (!child) {
        return null;
      }

      const { props } = child;
      const checked = options.indexOf(props.label) !== -1;

      return React.cloneElement(
        child,
        Object.assign({}, props, {
          key: index,
          checked: checked,
          onChange: this.handleChange.bind(this, checked, props.label),
        }),
      );
    });

    return (
      <div className={groupClassName} style={style}>
        {realChildren}
      </div>
    );
  }

  getOptions() {
    if ('value' in this.props && this.props.value instanceof Array) {
      return this.props.value;
    }
    return this.state.options;
  }

  handleChange = (checked: boolean, label: string) => {
    const options = this.getOptions();
    const { onChange } = this.props;
    const newOptions = !checked
      ? Array.from(new Set([...options, label]))
      : options.filter(option => option !== label);

    console.log(checked, label)
    this.setState({
      options: newOptions,
    });

    if (typeof onChange === 'function') {
      onChange(newOptions);
    }
  }
}

export default CheckboxGroup;
