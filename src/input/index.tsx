import * as React from 'react';
import * as classNames from 'classnames';
import Icon from '../icon';

export type InputSize = 'small' | 'default' | 'large';
export type InputFormStatus = 'error' | 'default' | 'success' | 'warning';

export type InputProps = {
  className?: string;
  prefixCls?: string;
  size?: InputSize;
  name?: string;
  disabled?: boolean;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  status?: InputFormStatus;
  type?: 'text' | 'password' | 'number';
  digits?: number;
  prefix?: string;
  prefixClassName?: string;
  suffix?: string;
  suffixClassName?: string;
  wrapperClassName?: string;
  wrapperRef?: React.RefObject<HTMLDivElement>;
  onChange?: (value: string) => void;
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function fixControlledValue<T>(value: T) {
  if (typeof value === 'undefined' || value === null) {
    return '';
  }
  return value;
}

class Input extends React.Component<InputProps> {
  public static defaultProps = {
    prefixCls: 'dk-input',
    size: 'default' as InputSize,
    status: 'default' as InputFormStatus,
    type: 'text',
  };
  public static componentType = 'Input';

  public static getDerivedStateFromProps(nextProps: InputProps) {
    if ('value' in nextProps) {
      return {
        value: nextProps.value,
      };
    }
    return null;
  }
  constructor(props: InputProps) {
    super(props);
    this.state = {
      value: props.value,
    };
  }

  public render() {
    const {
      children,
      className,
      disabled,
      size,
      type,
      prefixCls,
      prefix,
      suffix,
      prefixClassName,
      suffixClassName,
      wrapperClassName,
      wrapperRef,
      status,
      ...attributes
    } = this.props;
    const value = this.props.value;
    const inputClassName = classNames(
      prefixCls,
      {
        [`${prefixCls}-large`]: size === 'large',
        [`${prefixCls}-small`]: size === 'small',
        [`${prefixCls}-prefix`]: prefix,
        [`${prefixCls}-suffix`]: suffix,
        [`${prefixCls}-${status}`]: status !== 'default',
      },
      className,
    );
    const inputType = type === 'password' ? 'password' : 'text';
    if ('value' in this.props) {
      attributes.value = fixControlledValue(value);
      delete attributes.defaultValue;
    }
    const inputNode = (
      <input
        {...attributes}
        className={inputClassName}
        readOnly={disabled}
        type={inputType}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
      />
    );

    return prefix || suffix ? (
      <div ref={wrapperRef} className={classNames(`${prefixCls}-wrapper`, wrapperClassName)}>
        {prefix ? (
          <Icon type={prefix} className={classNames(`${prefixCls}-prefix-icon`, prefixClassName)} />
        ) : null}
        {inputNode}
        {suffix ? (
          <Icon type={suffix} className={classNames(`${prefixCls}-suffix-icon`, suffixClassName)} />
        ) : null}
      </div>
    ) : (
      inputNode
    );
  }

  public handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { onChange } = this.props;
    const { value } = event.target;

    if (this.invalidNumber(value)) {
      return;
    }

    if (onChange) {
      onChange(value);
    }
  };

  public handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const { onBlur } = this.props;
    if (onBlur) {
      onBlur(event);
    }
    if (this.invalidNumber(value)) {
      return;
    }
  };

  public handleFocus = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { onFocus } = this.props;
    if (onFocus) {
      onFocus(event);
    }
  };

  public invalidNumber = (value: string) => {
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
  };
}

export default Input;
