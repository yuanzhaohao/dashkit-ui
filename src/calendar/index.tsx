import './style.scss';

import * as React from 'react';
import * as classNames from 'classnames';
import * as PropTypes from 'prop-types';
import { PickerProps } from './types';
import Input from '../input';
import Icon from '../icon';
import Day from './day';
import utils from './utils';

export type BasicPickerType = 'day' | 'week' | 'month' | 'time' | 'datetime' | 'range';
export type BasicPickerProps = PickerProps & {
  type?: BasicPickerType;
  placeholder?: string;
};

export type BasicPickerState = {
  current: Date;
};

class BasicPicker extends React.PureComponent<BasicPickerProps, BasicPickerState> {
  static defaultProps = {
    prefixCls: 'dk-calendar',
    type: 'day',
    disabled: false,
    value: '2018-10-10',
  };

  constructor(props: BasicPickerProps) {
    super(props);
    this.state = {
      current: this.getCurrent(),
    };
  }

  render() {
    const { className, prefixCls } = this.props;
    const dateClassName = classNames({
      [`${prefixCls}`]: true,
    }, className);

    console.log(this.state.current);

    return (
      <span className={dateClassName}>
        <Input className={`${prefixCls}-input`} placeholder={this.getPlaceholder()} />
        <Icon type="calendar" className={`${prefixCls}-icon`} />
        <div className={`${prefixCls}-content`}>
          {this.renderContent()}
        </div>
      </span>
    );
  }

  renderContent = () => {
    const { type, prefixCls, disabled } = this.props;
    const { current } = this.state;

    switch (type) {
      default: {
        return (
          <Day
            current={current}
            prefixCls={prefixCls}
            disabled={disabled}
           />
        );
      }
    }
  }

  getPlaceholder = () => {
    const { placeholder, type } = this.props;
    if (placeholder !== undefined) return placeholder;
    switch (type) {
      case 'day':
        return 'Select date';
      case 'month':
        return 'Select Month';
      case 'time':
        return 'Select Time';
      case 'week':
        return 'Select Week';
      default:
        return 'Select Datetime';
    }
  }

  getFormat = () => {
    const { format, type } = this.props;
    if (format) return format;
    switch (type) {
      case 'day':
        return 'yyyy-MM-dd';
      case 'month':
        return 'yyyy-MM';
      case 'time':
        return 'HH:mm:ss';
      case 'week':
        return 'yyyy WW';
      default:
        return 'yyyy-MM-dd HH:mm:ss';
    }
  }

  parseDate(value) {
    return utils.toDateWithFormat(value, this.getFormat(), undefined);
  }

  getCurrent = () => {
    let current;
    if (this.props.type === 'range') {
      current = (this.props.value || []).map((v) => {
        v = this.parseDate(v)
        if (utils.isInvalid(v)) v = utils.newDate()
        return v
      })
      if (current.length === 0) current = [utils.newDate(), utils.newDate()]

      if (utils.compareMonth(current[0], current[1], -1) >= 0) {
        current[1] = utils.addMonths(current[0], 1)
      }
    } else {
      current = this.parseDate(this.props.value)
    }

    return current
  }
}

export default BasicPicker;

