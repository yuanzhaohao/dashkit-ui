import * as React from 'react';
import * as PropTypes from 'prop-types';
import { PickerProps } from './types';
import Icon from '../icon';
import utils from './utils';

export type DayProps = PickerProps & {
  current: Date;
};

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

class Day extends React.PureComponent<DayProps> {
  cachedDate: Date | null;
  cachedDays: any;
  constructor(props: DayProps) {
    super(props);
    this.cachedDate = null;
    this.cachedDays = null;
  }

  render() {
    const { prefixCls, disabled } = this.props;
    const days = this.getDays();

    return (
      <div className={`${prefixCls}-day-picker`}>
        <div className={`${prefixCls}-day-header`}>
          <Icon className={`${prefixCls}-day-icon`} type="chevrons-left" />
          <Icon className={`${prefixCls}-day-icon`} type="chevron-left" />
          <div className={`${prefixCls}-day-select`}>
            <span>November</span>
            <span>2018</span>
          </div>
          <Icon className={`${prefixCls}-day-icon`} type="chevron-right" />
          <Icon className={`${prefixCls}-day-icon`} type="chevrons-right" />
        </div>
        <div className={`${prefixCls}-day-week`}>
          {weekdays.map((w) => <span key={w}>{w}</span>)}
        </div>
        <div className={`${prefixCls}-day-list`}>
          {days.map((date: Date) =>
            <span
              key={date.getTime()}
              className={`${prefixCls}-day-item`}
              onClick={disabled ? undefined : this.handleDayClick.bind(this, date)}
            >
              {date.getDate()}
            </span>
          )}
        </div>
      </div>
    );
  }

  getDays = () => {
    const { current } = this.props
    if (this.cachedDate && this.cachedDate.getTime() === current.getTime() && this.cachedDays) {
      return this.cachedDays;
    }
    this.cachedDays = utils.getDaysOfMonth(current);
    this.cachedDate = current;

    return this.cachedDays;
  }

  handleDayClick = (date: Date) => {

  }
}

export default Day;
