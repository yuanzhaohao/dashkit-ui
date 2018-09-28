import './style.scss';

import * as React from 'react';
import * as classNames from 'classnames';


export type CheckboxProps = {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  checked?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  defaultChecked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export interface CheckboxState {
  checked?: boolean;
}
class Checkbox extends React.PureComponent<CheckboxProps, CheckboxState> {
  id: string;
  static defaultProps = {
    disabled: false,
    prefixCls: 'dk-checkbox',
    indeterminate: false,
  };

  constructor(props: CheckboxProps) {
    super(props);

    const checked = 'defaultChecked' in props ? props.defaultChecked : false;
    this.state = {
      checked,
    };
    this.id = `toggle_${Math.random().toString().replace(/0\./, '')}`
  }

  render() {
    const { children, className, style, prefixCls, disabled, indeterminate } = this.props;
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
      <label className={checkboxClassName} style={style}>
        <input
          className={`${prefixCls}-input`}
          type="checkbox"
          disabled={disabled}
          onChange={this.handleChange}
          checked={!!checked}
        />
        <i className={`${prefixCls}-indicator`} />
        {children && <span>{children}</span>}
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
    const { onChange } = this.props;
    const { checked } = event.target;

    this.setState({
      checked,
    });

    if (typeof onChange === 'function') {
      onChange(event);
    }
  }
}

export default Checkbox;
