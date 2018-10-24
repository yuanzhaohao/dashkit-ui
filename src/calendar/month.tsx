import * as React from 'react';
import * as classNames from 'classnames';
import { PickerProps } from './types';
import { monthValues, addYears, isSameMonth } from './utils';
import Icon from '../icon';

export type MonthProps = PickerProps;

class Month extends React.PureComponent<MonthProps> {
  constructor(props: MonthProps) {
    super(props);
  }

  render() {
    const { prefixCls, current } = this.props;

    return (
      <div className={`${prefixCls}-ym`}>
        <div className={`${prefixCls}-header`}>
          <div className={`${prefixCls}-config`}>
            <Icon
              className={`${prefixCls}-prev`}
              type="chevrons-left"
              onClick={this.handlePrevYear}
            />
            <div className={`${prefixCls}-select`}>
              <span onClick={() => this.props.onModeChange('year')}>{current.getFullYear()}</span>
            </div>
            <Icon
              className={`${prefixCls}-next`}
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
      [`${prefixCls}-ym-item`]: true,
      [`${prefixCls}-ym-item-active`]: value && isSameMonth(date, value),
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
    const { current, onChange, type, disabled } = this.props;

    if (disabled) {
      return;
    }
    const date = new Date(current.getTime());
    const isMonth = type === 'month';

    date.setMonth(i, 1);
    onChange(date, isMonth);
    if (!isMonth) {
      this.props.onModeChange(type);
    }
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
