import * as classNames from 'classnames';
import * as React from 'react';
import './style.scss';

export type InputSize = 'small' | 'default' | 'large';

export type InputProps = {
  className?: string;
  prefixCls?: string;
  size?: InputSize;
  value?: string | number;
  name?: string;
  disabled?: boolean;
  defaultValue?: string;
  placeholder?: string;
  type?: string;
  digits?: number;
  onChange?: (value: string) => void;
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

function fixControlledValue<T>(value: T) {
  if (typeof value === 'undefined' || value === null) {
    return '';
  }
  return value;
}

class Input extends React.Component<InputProps> {
  static defaultProps = {
    prefixCls: 'dashkit-input',
    size: 'default' as InputSize,
    type: 'text',
  };

  constructor(props: InputProps) {
    super(props);
    this.state = {
      value: props.value,
    };
  }

  render() {
    const {
      children,
      className,
      disabled,
      size,
      type,
      prefixCls,
      ...attributes
    } = this.props;
    const value = this.props.value;
    const inputClassName = classNames(
      prefixCls,
      {
        [`${prefixCls}-large`]: size === 'large',
        [`${prefixCls}-small`]: size === 'small',
      },
      className,
    );
    const inputType = type === 'password' ? 'password' : 'text';
    if ('value' in this.props) {
      attributes.value = fixControlledValue(value);
      delete attributes.defaultValue;
    }
    return (
      <input
        {...attributes}
        className={inputClassName}
        readOnly={disabled}
        type={inputType}
        onChange={this.handleChange}
        onKeyUp={this.handleKeyUp}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
      />
    );
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { onChange } = this.props;
    const { value } = event.target;

    if (this.invalidNumber(value)) {
      return;
    }

    if (onChange) {
      onChange(value);
    }
  }

  handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const { onBlur } = this.props;
    if (onBlur) {
      onBlur(event);
    }
    if (this.invalidNumber(value)) {
      return;
    }
  }

  handleFocus = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { onFocus } = this.props;
    if (onFocus) {
      onFocus(event);
    }
  }

  handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { onKeyUp } = this.props;
    if (onKeyUp) {
      onKeyUp(event);
    }
  }

  invalidNumber = (value: string) => {
    const { digits, type } = this.props;
    if (type !== 'number') {
      return false;
    }

    let reg = '^-?\\d*';
    if (digits === undefined) {
      reg += '\\.?\\d*';
    } else if (digits > 0) {
      reg += `\\.?\\d{0,${digits}}`;
    }
    reg += '$';
    return !new RegExp(reg).test(value);
  }
}

export default Input;
