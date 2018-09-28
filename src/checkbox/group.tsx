import * as React from 'react';
import * as classNames from 'classnames';
import * as PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import { CheckboxProps } from './checkbox';

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
    groupHook: PropTypes.object,
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
      groupHook: this,
    }
  }

  render() {
    const { className, style, prefixCls } = this.props;
    const { options } = this.state;
    const groupClassName = classNames(
      {
        [`${prefixCls}-group`]: true,
      },
      className,
    );

    const children = React.Children.map(this.props.children, (child: React.ReactChild, index) => {
      if (!child || child.type.elementType !== 'Checkbox') {
        return null;
      }

      const props: CheckboxProps = child.props;
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
        {children}
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
    console.log(options)
    const { onChange } = this.props;
    const newOptions = !checked
      ? Array.from(new Set([...options, label]))
      : options.filter(option => option !== label);

    this.setState({
      options: newOptions,
    });

    if (typeof onChange === 'function') {
      onChange(newOptions);
    }
  }
}

export default CheckboxGroup;
