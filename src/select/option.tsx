import * as React from 'react';
import * as classNames from 'classnames';
import { createConsumer } from './context';
import { SelectOptionProps } from './types';

class Option extends React.PureComponent<SelectOptionProps> {
  render() {
    const { prefixCls, value, onRawChange, disabled, options, ...attributes } = this.props;
    const optionClassName = classNames({
      [`${prefixCls}-option`]: true,
      [`${prefixCls}-option-disabled`]: disabled,
      [`${prefixCls}-option-active`]:
        // @ts-ignore
        options instanceof Array && options.indexOf(value) !== -1
          ? true
          : options === value
            ? true
            : false
    });
    return (
      <div
        className={optionClassName}
        onClick={this.handleOptionClick}
        {...attributes}
      />
    );
  }

  handleOptionClick = () => {
    const { value, disabled, onRawChange } = this.props;

    if (!disabled && typeof onRawChange === 'function') {
      onRawChange(value);
    }
  }
}

export default createConsumer(Option);
