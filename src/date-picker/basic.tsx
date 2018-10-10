import * as React from 'react';
import * as classNames from 'classnames';
import * as PropTypes from 'prop-types';
import { PickerProps } from './types';
import Input from '../input';
import Icon from '../icon';

export type BasicPickerType = 'date' | 'week' | 'month' | 'time' | 'datetime' | 'range';
export type BasicPickerProps = PickerProps & {
  type?: BasicPickerType;
  placeholder?: string;
};

export type BasicPickerState = {
  current?: string;
};

class BasicPicker extends React.PureComponent<BasicPickerProps, BasicPickerState> {
  static defaultProps = {
    prefixCls: 'dk-calendar',
    disabled: false,
  };

  constructor(props: BasicPickerProps) {
    super(props);
    this.state = {
      current: this.getCurrent(),
    };
  }

  render() {
    const { className, prefixCls, placeholder } = this.props;
    const dateClassName = classNames({
      [`${prefixCls}`]: true,
    }, className);

    return (
      <span className={dateClassName}>
        <Input className={`${prefixCls}-input`} placeholder={placeholder} />
        <Icon type="calendar" className={`${prefixCls}-icon`} />
        <div className={`${prefixCls}-container`}>
          <div className={`${prefixCls}-date`}>

          </div>
        </div>
      </span>
    );
  }

  getFormat = () => {
    const { format, type } = this.props;
    if (format) return format;
    switch (type) {
      case 'date':
        return 'yyyy-MM-dd'
      case 'month':
        return 'yyyy-MM'
      case 'time':
        return 'HH:mm:ss'
      case 'week':
        return 'yyyy WW'
      default:
        return 'yyyy-MM-dd HH:mm:ss'
    }
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
