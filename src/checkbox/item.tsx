import * as React from 'react';
import * as classNames from 'classnames';
import { CheckboxProps } from './types';
import { createConsumer } from './context';

export type ItemProps = CheckboxProps & {
  // options?: string[];
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
    const { children, className, prefixCls, type, label, disabled, indeterminate, onRawChange, onChange, ...attributes } = this.props;
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
          type={type}
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
    const { onChange, onRawChange, children, label } = this.props;
    const { checked } = event.target;

    // if (rootContext) {
    //   const length = rootContext.getOptions().length + (checked ? 1 : -1);
    //   const min = rootContext.getMin();
    //   if (min !== undefined && length < min) {
    //     return;
    //   }

    //   const max = rootContext.getMax();
    //   if (max !== undefined && length > max) {
    //     return;
    //   }
    // }

    if (onRawChange) {
      onRawChange(checked, label);
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