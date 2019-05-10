import * as React from 'react';
import * as classNames from 'classnames';
import { createConsumer } from './context';
import { SelectOptionProps } from './types';

class Option extends React.PureComponent<Partial<SelectOptionProps>> {
  public render() {
    const {
      prefixCls,
      value,
      className,
      inputValue,
      onRawChange,
      disabled,
      options,
      filterOption,
      ...attributes
    } = this.props;
    const optionClassName = classNames(
      {
        [`${prefixCls}-option`]: true,
        [`${prefixCls}-option-disabled`]: disabled,
        [`${prefixCls}-option-active`]:
          // @ts-ignore
          options instanceof Array && options.indexOf(value) !== -1
            ? true
            : options === value
            ? true
            : false,
      },
      className,
    );

    const isShow = typeof filterOption === 'function' ? filterOption(inputValue, value) : true;

    if (isShow) {
      return <div className={optionClassName} onClick={this.handleOptionClick} {...attributes} />;
    }
    return null;
  }

  public handleOptionClick = () => {
    const { value, disabled, onRawChange } = this.props;

    if (!disabled && typeof onRawChange === 'function') {
      onRawChange(value);
    }
  };
}

export default createConsumer(Option);
