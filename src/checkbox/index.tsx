import './style.scss';

import * as React from 'react';
import * as classNames from 'classnames';


export type SwitchProps = {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  checked?: boolean;
  disabled?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
};

export interface SwitchState {
  checked?: boolean;
}
class checkbox extends React.Component<SwitchProps, SwitchState> {
  static defaultProps = {
    disabled: false,
    prefixCls: 'dk-checkbox',
  };

  constructor(props: SwitchProps) {
    super(props);

    this.state = {
      checked: 'defaultChecked' in props ? props.defaultChecked : false,
    };
  }

  render() {
    const { children, className, style, prefixCls, disabled } = this.props;
    const checked = this.getChecked();
    const checkboxClassName = classNames(
      prefixCls,
      {
        [`${prefixCls}-checked`]: checked,
        [`${prefixCls}-disabled`]: disabled,
      },
      className,
    );
    return (
      <label
        className={checkboxClassName}
        onClick={this.handleChange}
        style={style}
      >
        {children}
      </label>
    );
  }

  getChecked = () => {
    return 'checked' in this.props ? this.props.checked : this.state.checked;
  }

  handleChange = () => {
    const { onChange } = this.props;
    const checked = !this.state.checked;
    this.setState({
      checked,
    });
    if (onChange) {
      onChange(checked);
    }
  }
}
export default checkbox;
