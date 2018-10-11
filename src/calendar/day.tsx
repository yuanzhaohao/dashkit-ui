import * as React from 'react';
import * as classNames from 'classnames';
import { isSameDay, addMonths } from 'date-fns';
import { BasicProps } from './types';
import { monthValues, weekdayValues, getDaysOfMonth } from './utils';
import Icon from '../icon';

export type DayProps = BasicProps & {
  current: Date;
  onChange: (date: Date, isSelectDay?: boolean) => void;
};

class Day extends React.PureComponent<DayProps> {
  cachedDate: Date | null;
  cachedDays: any;
  constructor(props: DayProps) {
    super(props);
    this.cachedDate = null;
    this.cachedDays = null;
  }

  render() {
    const { prefixCls, current } = this.props;
    const days = this.getDays();

    return (
      <div className={`${prefixCls}-day`}>
        <div className={`${prefixCls}-header`}>
          <div className={`${prefixCls}-config`}>
            <Icon
              className={`${prefixCls}-prev-year`}
              type="chevrons-left"
              onClick={this.handlePrevYear}
            />
            <Icon
              className={`${prefixCls}-prev-month`}
              type="chevron-left"
              onClick={this.handlePrevMonth}
            />
            <div className={`${prefixCls}-select`}>
              <span>{monthValues.long[current.getMonth()]}</span>
              <span>{current.getFullYear()}</span>
            </div>
            <Icon
              className={`${prefixCls}-next-month`}
              type="chevron-right"
              onClick={this.handleNextMonth}
            />
            <Icon
              className={`${prefixCls}-next-year`}
              type="chevrons-right"
              onClick={this.handleNextYear}
            />
          </div>

          <div className={`${prefixCls}-week`}>
            {weekdayValues.short.map((w) => <span key={w}>{w}</span>)}
          </div>
        </div>
        <div className={`${prefixCls}-list`}>
          {days.map((date: Date) =>
            this.renderDay(date)
          )}
        </div>
      </div>
    );
  }

  renderDay = (date: Date) => {
    const { prefixCls, current, value } = this.props;
    const itemClassName = classNames({
      [`${prefixCls}-day-item`]: true,
      [`${prefixCls}-day-item-other`]: current.getMonth() !== date.getMonth(),
      [`${prefixCls}-day-item-active`]: value && isSameDay(date, value),
    });

    return (
      <div
        key={date.getTime()}
        className={itemClassName}
        onClick={this.handleDayClick.bind(this, date)}
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
    this.cachedDays = getDaysOfMonth(current);
    this.cachedDate = current;

    return this.cachedDays;
  }

  handleDayClick = (date: Date) => {
    const { current, onChange, disabled } = this.props;

    if (disabled) {
      return;
    }

    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      current.getHours(),
      current.getMinutes(),
      current.getSeconds(),
    );
    onChange(newDate, true);
  }

  handleMouth = (month: number) => {
    const { current, onChange, disabled } = this.props;
    if (disabled) {
      return;
    }
    onChange(addMonths(current, month));
  }

  handlePrevYear = () => {
    this.handleMouth(-12);
  }

  handleNextYear = () => {
    this.handleMouth(12);
  }

  handlePrevMonth = () => {
    this.handleMouth(-1);
  }

  handleNextMonth = () => {
    this.handleMouth(1);
  }
}

export default Day;
