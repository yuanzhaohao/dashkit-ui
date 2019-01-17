import * as React from 'react';
import * as classNames from 'classnames';
import { createConsumer } from './context';

export type InputProps = {
  prefixCls?: string;
  className?: string;
  checked?: boolean;
  value?: string;
  indeterminate?: boolean;
  disabled?: boolean;
  defaultChecked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type ItemProps = InputProps & {
  onRawChange?: (checked?: boolean, label?: string) => void;
  options?: string[];
  min?: number;
  max?: number;
  type: 'checkbox' | 'radio';
};

export type ItemState = {
  checked: boolean;
};

class Item extends React.PureComponent<ItemProps, ItemState> {
  constructor(props: ItemProps) {
    super(props);

    const checked = 'defaultChecked' in props ? props.defaultChecked : !!props.checked;
    this.state = {
      checked,
    };
  }

  render() {
    const {
      children,
      className,
      prefixCls,
      type,
      disabled,
      indeterminate,
      onChange,
      onRawChange,
      value,
      min,
      max,
      options,
      ...attributes
    } = this.props;
    const checked = this.getChecked();
    const checkboxClassName = classNames(
      prefixCls,
      {
        [`${prefixCls}-checked`]: checked,
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-group-item`]: options instanceof Array,
        [`${prefixCls}-indeterminate`]: indeterminate,
      },
      className,
    );
    return (
      <label className={checkboxClassName} {...attributes}>
        <input
          className={`${prefixCls}-input`}
          type={type}
          disabled={disabled}
          onChange={this.handleChange}
          checked={checked}
          value={value}
        />
        <i className={`${prefixCls}-indicator`} />
        {!!children && (
          <span>{children}</span>
        )}
      </label>
    );
  }

  getChecked = () => {
    const { checked, options, value } = this.props;

    if (options instanceof Array) {
      return options.indexOf(value) !== -1;
    }
    if (checked !== undefined) {
      return checked;
    }
    return this.state.checked;
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { onChange, type, onRawChange, options, value } = this.props;
    const { checked } = event.target;

    if (type === 'checkbox' && options instanceof Array) {
      const { min, max } = this.props;
      const length = options.length + (checked ? 1 : -1);
      if ((min !== undefined && length < min) || (max !== undefined && length > max)) {
        return;
      }
    }

    if (onRawChange) {
      onRawChange(checked, value);
    }

    this.setState({
      checked,
    });

    if (typeof onChange === 'function') {
      onChange(event);
    }
  }
}

export default createConsumer(Item);