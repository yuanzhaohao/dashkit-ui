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
  checkedChildren?: React.ReactNode;
  unCheckedChildren?: React.ReactNode;
  onChange?: (checked: boolean) => void;
};

export interface SwitchState {
  checked?: boolean;
}
class Switch extends React.Component<SwitchProps, SwitchState> {
  public static defaultProps = {
    checked: false,
    disabled: false,
    prefixCls: 'dk-switch',
    size: 'default' as SwitchSize,
  };
  constructor(props: SwitchProps) {
    super(props);
    const checked = props.checked;
    this.state = {
      checked,
    };
  }

  public componentWillReceiveProps(nextProps: SwitchProps) {
    if ('checked' in nextProps) {
      this.setState({
        checked: !!nextProps.checked,
      });
    }
  }
  public render() {
    const { className, style, checkedChildren, unCheckedChildren, disabled, size, prefixCls } = this.props;
    const { checked } = this.state;
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
      <button
        className={switchClassName}
        style={style}
        onClick={disabled ? undefined : this.onToggle}
      >
        <span className={`${prefixCls}-inner`}>
          {checked ? checkedChildren : unCheckedChildren}
        </span>
      </button>
    );
  }

  private onToggle = () => {
    const { disabled, onChange } = this.props;
    if (disabled) {
      return;
    }
    const checked = !this.state.checked;
    this.setState({
      checked,
    });
    if (onChange) {
      onChange(checked);
    }
  }
}
export default Switch;
