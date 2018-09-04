import './style.scss';
import * as classNames from 'classnames';
import * as React from 'react';

type InputProps = {
  type?: string;
  value?: string;
  defaultValue?: string;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  onChange?: (value: string) => void;
};

class Input extends React.Component<InputProps> {
  public static defaultProps = {
    type: 'text',
    disabled: false,
    value: '',
  };

  public render() {
    const { className, type, disabled, onChange, ...attributes } = this.props;
    const inputClassName = classNames(
      'input',
      {
        'input-disabled': disabled,
      },
      className,
    );
    const isTextareaInput = type === 'textarea';
    let TAG = 'input';

    if (isTextareaInput) {
      TAG = 'textarea';
    }
    return (
      <TAG
        {...attributes}
        readOnly={disabled}
        className={inputClassName}
        onChange={onChange && !disabled ? this.handleChange : undefined}
        type={type}
      />
    );
  }

  public handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value.trim();
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
  }
}
export default Input;
