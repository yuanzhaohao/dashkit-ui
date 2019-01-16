import * as React from 'react';
import * as classNames from 'classnames';
// import { createConsumer } from './context';

export type CheckboxProps = {
  prefixCls?: string;
  className?: string;
  checked?: boolean;
  label?: string;
  disabled?: boolean;
  indeterminate?: boolean;
  defaultChecked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rootContext: any;
};

export interface CheckboxState {
  checked?: boolean;
}
class Checkbox extends React.PureComponent<CheckboxProps, CheckboxState> {
  static Group: any;
  static defaultProps = {
    prefixCls: 'dk-checkbox',
  };

  constructor(props: CheckboxProps) {
    super(props);

    const checked = 'defaultChecked' in props ? props.defaultChecked : !!props.checked;
    this.state = {
      checked,
    };
  }

  render() {
    const { children, className, prefixCls, label, disabled, indeterminate, rootContext, onChange, ...attributes } = this.props;
    const checked = this.getChecked();
    const checkboxClassName = classNames(
      prefixCls,
      {
        [`${prefixCls}-checked`]: checked,
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-indeterminate`]: indeterminate,
      },
      className,
    );
    return (
      <label className={checkboxClassName} {...attributes}>
        <input
          className={`${prefixCls}-input`}
          type="checkbox"
          disabled={disabled}
          onChange={this.handleChange}
          checked={checked}
        />
        <i className={`${prefixCls}-indicator`} />
        <span>{children || label}</span>
      </label>
    );
  }

  getChecked = () => {
    if ('checked' in this.props) {
      return this.props.checked;
    }
    return this.state.checked;
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { onChange, rootContext } = this.props;
    const { checked } = event.target;

    if (rootContext) {
      const length = rootContext.getOptions().length + (checked ? 1 : -1);
      const min = rootContext.getMin();
      if (min !== undefined && length < min) {
        return;
      }

      const max = rootContext.getMax();
      if (max !== undefined && length > max) {
        return;
      }
    }

    this.setState({
      checked,
    });

    if (typeof onChange === 'function') {
      onChange(event);
    }
  }
}

export default Checkbox;
