import * as React from 'react';
import * as classNames from 'classnames';
import { isSameMonth, addYears } from 'date-fns';
import { BasicProps } from './types';
import { monthValues, weekdayValues, getDaysOfMonth } from './utils';
import Icon from '../icon';

export type MonthProps = BasicProps & {
  current: Date;
  onChange: (date: Date, isSelectDay?: boolean) => void;
};

class Month extends React.PureComponent<MonthProps> {
  constructor(props: MonthProps) {
    super(props);
  }

  render() {
    const { prefixCls, current } = this.props;

    return (
      <div className={`${prefixCls}-month`}>
        <div className={`${prefixCls}-header`}>
          <div className={`${prefixCls}-config`}>
            <Icon
              className={`${prefixCls}-prev-year`}
              type="chevrons-left"
              onClick={this.handlePrevYear}
            />
            <div className={`${prefixCls}-select`}>
              <span>{current.getFullYear()}</span>
            </div>
            <Icon
              className={`${prefixCls}-next-year`}
              type="chevrons-right"
              onClick={this.handleNextYear}
            />
          </div>
        </div>
        <div className={`${prefixCls}-list`}>
          {monthValues.short.map((m, i) =>
            this.renderMonth(m, i)
          )}
        </div>
      </div>
    );
  }

  renderMonth = (m: string, key: number) => {
    const { prefixCls, current, value } = this.props;
    const date = new Date(current.getTime());
    date.setMonth(key);

    const itemClassName = classNames({
      [`${prefixCls}-month-item`]: true,
      [`${prefixCls}-month-item-active`]: value && isSameMonth(date, value),
    });

    return (
      <div
        key={key}
        className={itemClassName}
        onClick={this.handleMonthClick.bind(this, key)}
      >
        <span>{m}</span>
      </div>
    );
  }

  handleMonthClick = (i: number) => {
    const { current, onChange, disabled } = this.props;

    if (disabled) {
      return;
    }
    const date = new Date(current.getTime());

    date.setMonth(i, 1);
    onChange(date, true);
  }

  handleYear = (year: number) => {
    const { current, onChange, disabled } = this.props;
    if (disabled) {
      return;
    }
    onChange(addYears(current, year));
  }

  handlePrevYear = () => {
    this.handleYear(-1);
  }

  handleNextYear = () => {
    this.handleYear(1);
  }
}

export default Month;
