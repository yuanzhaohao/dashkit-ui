import * as React from 'react';
import * as classNames from 'classnames';
import { PickerChildProps } from './types';
import { monthValues, weekdayValues, addDays, addMonths, compareAsc, getDaysOfMonth, isSameDay, isSameWeek, formatDate } from './utils';
import Icon from '../icon';
import Time from './time';

export type DayProps = PickerChildProps & {
  onDayHover?: (date: Date) => void;
};
export type DayState = {
  hoverDate: Date | null;
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
    const { prefixCls, current, type } = this.props;
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
          {days.map((date: Date) => this.renderDay(date) )}
        </div>
        {type === 'datetime' ? this.renderDatetime() : null}
      </div>
    );
  }

  renderDay = (date: Date) => {
    const { current, value, type, range, prefixCls, rangeDate } = this.props;
    const hoverProps: any = {};
    let itemClassName = `${prefixCls}-day-item`;
    if (type === 'week') {
      const { hoverDate } = this.state;
      hoverProps.onMouseEnter = this.handleHoverWeek.bind(this, date);
      hoverProps.onMouseLeave = this.handleHoverWeekLeave;
      itemClassName = classNames(itemClassName, {
        [`${prefixCls}-day-item-other`]: current.getMonth() !== date.getMonth(),
        [`${prefixCls}-day-item-hover`]: !!(hoverDate && isSameWeek(date, hoverDate)),
        [`${prefixCls}-day-item-hover-active`]: value && isSameWeek(date, value),
        [`${prefixCls}-day-item-hover-start`]: date.getDay() === 0,
        [`${prefixCls}-day-item-hover-end`]: date.getDay() === 6,
      });
    } else if (rangeDate && current.getMonth() === date.getMonth()) {
      hoverProps.onMouseEnter = this.handleDayHover.bind(this, date);
      itemClassName = classNames(itemClassName, {
        [`${prefixCls}-day-item-hover`]: compareAsc(rangeDate[0], date) <= 0 && compareAsc(rangeDate[1], date) >= 0,
        [`${prefixCls}-day-item-hover-active`]: isSameDay(rangeDate[0], date) || isSameDay(rangeDate[1], date),
        [`${prefixCls}-day-item-hover-start`]: isSameDay(rangeDate[0], date),
        [`${prefixCls}-day-item-hover-end`]: isSameDay(rangeDate[1], date),
      });
    } else {
      hoverProps.onMouseEnter = this.handleDayHover.bind(this, date);

      itemClassName = classNames(itemClassName, {
        [`${prefixCls}-day-item-other`]: current.getMonth() !== date.getMonth(),
        [`${prefixCls}-day-item-active`]: value && isSameDay(date, value),
      });
    }
    return (
      <div
        key={date.getTime()}
        className={itemClassName}
        onClick={this.handleDayClick.bind(this, date)}
        {...hoverProps}
      >
        <span>{date.getDate()}</span>
      </div>
    );
  }

  renderDatetime = () => {
    const { format, current, prefixCls, ...attributes } = this.props;
    const match = format.match(/[H|h].*/);
    const newFormat = match ? match[0] : format;

    return (
      <div className={`${prefixCls}-day-datetime`}>
        <Time
          {...attributes}
          prefixCls={prefixCls}
          current={current}
          format={newFormat}
          className={`${prefixCls}-day-datetime-timer`}
          onChange={this.handleTimerChange}
        />
        <span>{formatDate(current, newFormat)}</span>
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

  handleDayHover = (date: Date) => {
    const { onDayHover } = this.props;
    if (typeof onDayHover === 'function') {
      onDayHover(date);
    }
  }

  handleTimerChange = (date: Date) => {
    const { onChange } = this.props;
    onChange(date);
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
