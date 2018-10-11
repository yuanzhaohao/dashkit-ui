import * as React from 'react';
import * as classNames from 'classnames';
import * as PropTypes from 'prop-types';
import { PickerProps } from './types';
import Icon from '../icon';
import utils from './utils';

export type DayProps = PickerProps & {
  current: Date;
  onChange?: (date: Date) => void;
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
          <Icon className={`${prefixCls}-day-prev-year`} type="chevrons-left" />
          <Icon className={`${prefixCls}-day-prev-month`} type="chevron-left" />
          <div className={`${prefixCls}-day-select`}>
            <span>November</span>
            <span>2018</span>
          </div>
          <Icon className={`${prefixCls}-day-next-month`} type="chevron-right" />
          <Icon className={`${prefixCls}-day-next-year`} type="chevrons-right" />
        </div>
        <div className={`${prefixCls}-day-week`}>
          {weekdays.map((w) => <span key={w}>{w}</span>)}
        </div>
        <div className={`${prefixCls}-day-list`}>
          {days.map((date: Date) =>
              this.renderDay(date)
          )}
        </div>
      </div>
    );
  }

  renderDay = (date: Date) => {
    const { prefixCls, disabled, current } = this.props;
    const itemClassName = classNames({
      [`${prefixCls}-day-item`]: true,
      [`${prefixCls}-day-item-other`]: current.getMonth() !== date.getMonth(),
      [`${prefixCls}-day-item-active`]: utils.isSameDay(date, current),
    });

    return (
      <div
        key={date.getTime()}
        className={itemClassName}
        onClick={disabled ? undefined : this.handleDayClick.bind(this, date)}
      >
        <span>{date.getDate()}</span>
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
    const { current, onChange } = this.props;
    if (typeof onChange === 'function') {
      const newDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        current.getHours(),
        current.getMinutes(),
        current.getSeconds(),
      );
      onChange(newDate);
    }
  }
}

export default Day;
