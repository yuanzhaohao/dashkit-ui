import * as React from 'react';
import * as classNames from 'classnames';
import * as PropTypes from 'prop-types';
import Input from '../input';

export type DatePickerProps = {
  prefixCls?: string;
  className?: string;
  disabled?: boolean;
  onChange?: () => void;
};

export type DatePickerState = {
};

class DatePicker extends React.PureComponent<DatePickerProps, DatePickerState> {
  static defaultProps = {
    prefixCls: 'dk-datepicker',
    disabled: false,
  };

  constructor(props: DatePickerProps) {
    super(props);
  }

  render() {
    const { className, prefixCls, children } = this.props;
    const dateClassName = classNames({
      [`${prefixCls}`]: true,
    }, className);

    return (
      <div className={dateClassName}>{children}</div>
    );
  }
}

export default DatePicker;
