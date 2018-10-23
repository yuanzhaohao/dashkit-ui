import * as React from 'react';
import * as classNames from 'classnames';
import { BasicProps, CalendarType } from './types';
import { monthValues, weekdayValues, getDaysOfMonth, isSameDay, isSameWeek, addDays, addMonths } from './utils';
import Icon from '../icon';

export type DayProps = BasicProps & {
  type: 'day' | 'week';
  current: Date;
  onModeChange: (type: CalendarType) => void;
};

export type DayState = {
  hoverDate: null | Date;
};

class Day extends React.PureComponent<DayProps, DayState> {
  cachedDate: Date | null;
  cachedDays: any;
  static defaultProps = {
    type: 'day',
  };
  constructor(props: DayProps) {
    super(props);
    this.cachedDate = null;
    this.cachedDays = null;
    this.state = {
      hoverDate: null,
    };
  }

  render() {
    const { prefixCls, current } = this.props;
    const days = this.getDays();

    return (
      <div className={`${prefixCls}-day`}>
        <div className={`${prefixCls}-header`}>
          <div className={`${prefixCls}-config`}>
            <Icon
              className={`${prefixCls}-prev`}
              type="chevrons-left"
              onClick={this.handlePrevYear}
            />
            <Icon
              className={`${prefixCls}-prev-month`}
              type="chevron-left"
              onClick={this.handlePrevMonth}
            />
            <div className={`${prefixCls}-select`}>
              <span onClick={() => this.props.onModeChange('month')}>{monthValues.long[current.getMonth()]}</span>
              <span onClick={() => this.props.onModeChange('year')}>{current.getFullYear()}</span>
            </div>
            <Icon
              className={`${prefixCls}-next-month`}
              type="chevron-right"
              onClick={this.handleNextMonth}
            />
            <Icon
              className={`${prefixCls}-next`}
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
    const { type } = this.props;
    const itemClassName = this.getClassNames(date);
    return (
      <div
        key={date.getTime()}
        className={itemClassName}
        onClick={this.handleDayClick.bind(this, date)}
        onMouseEnter={type === 'week' ? this.handleHoverWeek.bind(this, date) : undefined}
        onMouseLeave={type === 'week' ? this.handleHoverWeekLeave : undefined}
      >
        <span>{date.getDate()}</span>
      </div>
    );
  }

  getClassNames = (date: Date) => {
    const { prefixCls, current, value, type } = this.props;
    if (type === 'week') {
      const { hoverDate } = this.state;
      return classNames({
        [`${prefixCls}-day-item`]: true,
        [`${prefixCls}-day-item-other`]: current.getMonth() !== date.getMonth(),
        [`${prefixCls}-day-item-week-active`]: !!(value && isSameWeek(date, value)),
        [`${prefixCls}-day-item-hover`]: !!(hoverDate && isSameWeek(date, hoverDate)),
        [`${prefixCls}-day-item-hover-start`]: date.getDay() === 0,
        [`${prefixCls}-day-item-hover-end`]: date.getDay() === 6,
      });
    }
    return classNames({
      [`${prefixCls}-day-item`]: true,
      [`${prefixCls}-day-item-other`]: current.getMonth() !== date.getMonth(),
      [`${prefixCls}-day-item-active`]: !!value && isSameDay(date, value),
    });
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
    const { current, onChange, disabled, type } = this.props;

    if (disabled) {
      return;
    }

    if (type === 'week') {
      if (date.getDay() === 0) {
        date = addDays(date, 1);
      }
      onChange(date, true);
    } else {
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

  handleHoverWeek = (date: Date) => {
    this.setState({
      hoverDate: date,
    });
  }

  handleHoverWeekLeave = () => {
    this.setState({
      hoverDate: null,
    });
  }
}

export default Day;
