import * as React from 'react';
import { toDate } from './utils';
import { PickerProps } from './types';
import TimeScroll from './time-scroll';

export type TimeProps = PickerProps;

class Time extends React.PureComponent<TimeProps> {
  constructor(props: TimeProps) {
    super(props);
  }

  render() {
    const { prefixCls, value, current, format } = this.props;
    const date = toDate(value || current);
    const hours = format.indexOf('h') >= 0 && date.getHours() >= 12
      ? date.getHours() - 12
      : date.getHours();

    return (
      <div className={`${prefixCls}-time`}>
        {
          format.indexOf('H') >= 0 &&
          <TimeScroll prefixCls={prefixCls} value={date.getHours()} total={24} onChange={this.handleChange.bind(this, 'hour')} />
        }
        {
          format.indexOf('h') >= 0 &&
          <TimeScroll prefixCls={prefixCls} value={hours} total={12} onChange={this.handleChange.bind(this, 'hour')} />
        }
        {
          format.indexOf('m') >= 0 &&
          <TimeScroll prefixCls={prefixCls} total={60} value={date.getMinutes()} onChange={this.handleChange.bind(this, 'minute')} />
        }
        {
          format.indexOf('s') >= 0 &&
          <TimeScroll prefixCls={prefixCls} total={60} value={date.getSeconds()} onChange={this.handleChange.bind(this, 'second')} />
        }
      </div>
    );
  }

  handleChange = (type: string, val: number) => {
    const { value, current, format, onChange } = this.props;

    const date = toDate(value || current);
    switch (type) {
      case 'hour':
        if (format.indexOf('h') >= 0 && date.getHours() >= 12) {
          date.setHours(val + 12);
        } else {
          date.setHours(val);
        }
        break
      case 'minute':
        date.setMinutes(val)
        break
      case 'second':
        date.setSeconds(val);
        break
      case 'ampm':
        const hours = date.getHours();
        if (val === 1 && hours < 12) {
          date.setHours(hours + 12);
        } else if (val === 0 && hours >= 12) {
          date.setHours(hours - 12);
        }
        break
      default:
    }
    onChange(date);
  }
}

export default Time;
