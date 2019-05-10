import './style.scss';

import * as classNames from 'classnames';
import * as React from 'react';

export type SwitchSize = 'small' | 'default' | 'large';

export type SwitchProps = {
  className?: string;
  style?: React.CSSProperties;
  prefixCls?: string;
  size?: SwitchSize;
  checked?: boolean;
  disabled?: boolean;
  defaultChecked?: boolean;
  checkedChildren?: React.ReactNode;
  unCheckedChildren?: React.ReactNode;
  onChange?: (checked: boolean) => void;
};

export interface SwitchState {
  checked?: boolean;
}
class Switch extends React.Component<SwitchProps, SwitchState> {
  public static defaultProps = {
    disabled: false,
    prefixCls: 'dk-switch',
    size: 'default' as SwitchSize,
  };

  constructor(props: SwitchProps) {
    super(props);

    this.state = {
      checked: 'defaultChecked' in props ? props.defaultChecked : false,
    };
  }

  public render() {
    const {
      className,
      style,
      checkedChildren,
      unCheckedChildren,
      disabled,
      size,
      prefixCls,
    } = this.props;
    const checked = this.getChecked();
    const switchClassName = classNames(
      prefixCls,
      {
        [`${prefixCls}-checked`]: checked,
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-small`]: size === 'small',
        [`${prefixCls}-large`]: size === 'large',
      },
      className,
    );
    return (
      <button className={switchClassName} onClick={this.handleChange} style={style}>
        <span className={`${prefixCls}-inner`}>
          {checked ? checkedChildren : unCheckedChildren}
        </span>
      </button>
    );
  }

  public getChecked = () => {
    return 'checked' in this.props ? this.props.checked : this.state.checked;
  };

  public handleChange = () => {
    const { onChange } = this.props;
    const checked = !this.getChecked();
    this.setState({
      checked,
    });
    if (typeof onChange === 'function') {
      onChange(checked);
    }
  };
}
export default Switch;
