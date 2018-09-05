import * as classNames from 'classnames';
import * as React from 'react';
import './style.scss';

export type InputSize = 'small' | 'default' | 'large';
export type InputType = 'text' | 'password' | 'integer' | 'number';

export type InputProps = {
  prefixCls?: string;
  className?: string;
  size?: InputSize;
  value?: any;
  name?: string;
  disabled?: boolean;
  defaultValue?: any;
  placeholder?: string;
  type?: InputType;
  onChange?: (value: any) => void;
};
export type InputState = {
  value?: string;
};
const REG = {
  integer: /^[-+]?[0-9]*$/,
  number: /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))*\s*$/,
};
class Input extends React.Component<InputProps, InputState> {
  public static defaultProps = {
    prefixCls: 'dashkit-input',
    value: '',
    size: 'default' as InputSize,
    type: 'text' as InputType,
  };

  constructor(props: InputProps) {
    super(props);
    this.state = {
      value: props.value || props.defaultValue,
    };
  }

  public componentWillReceiveProps(nextProps: InputProps) {
    if ('value' in nextProps && nextProps.value !== this.props.value) {
      this.setState({ value: nextProps.value });
    }
  }

  public render() {
    const {
      children,
      className,
      disabled,
      size,
      type,
      prefixCls,
      ...attributes
    } = this.props;
    const { value } = this.state;
    const inputClassName = classNames(
      prefixCls,
      {
        [`${prefixCls}-large`]: size === 'large',
        [`${prefixCls}-small`]: size === 'small',
        [`${prefixCls}-disabled`]: !!disabled,
      },
      className,
    );
    const inputType = type === 'password' ? 'password' : 'text';
    return (
      <input
        {...attributes}
        readOnly={disabled}
        className={inputClassName}
        onChange={!disabled ? this.handleChange : undefined}
        type={inputType}
        value={value}
      />
    );
  }

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { onChange, type } = this.props;
    let value: any = event.target.value;

    if (value && type === 'number') {
      if (!REG[type].test(value)) {
        return;
      } else {
        value = Number(value);
      }

      if (isNaN(value)) {
        return;
      }
    }

    this.setState({
      value,
    });

    if (onChange) {
      onChange(value);
    }
  }
}

export default Input;
