import * as React from 'react';
import * as classNames from 'classnames';
import { PickerChildProps } from './typings';
import { monthValues, addYears, isSameMonth } from './utils';
import Icon from '../icon';

export type MonthProps = PickerChildProps;

class Month extends React.PureComponent<MonthProps> {
  constructor(props: MonthProps) {
    super(props);
  }

  public render() {
    const { prefixCls, current, hideLeftIcon, hideRightIcon } = this.props;

    return (
      <div className={`${prefixCls}-ym`}>
        <div className={`${prefixCls}-header`}>
          <div className={`${prefixCls}-config`}>
            <Icon
              className={`${prefixCls}-config-icon`}
              type="chevrons-left"
              onClick={this.handlePrevYear}
              disabled={hideLeftIcon}
            />
            <div className={`${prefixCls}-select`}>
              <span onClick={() => this.props.onModeChange('year')}>{current.getFullYear()}</span>
            </div>
            <Icon
              className={`${prefixCls}-config-icon`}
              type="chevrons-right"
              onClick={this.handleNextYear}
              disabled={hideRightIcon}
            />
          </div>
        </div>
        <div className={`${prefixCls}-list`}>
          {monthValues.short.map((m, i) => this.renderMonth(m, i))}
        </div>
      </div>
    );
  }

  public renderMonth = (m: string, key: number) => {
    const { prefixCls, current, value } = this.props;
    const date = new Date(current.getTime());
    date.setMonth(key);

    const itemClassName = classNames({
      [`${prefixCls}-ym-item`]: true,
      [`${prefixCls}-ym-item-active`]: value && isSameMonth(date, value),
    });

    return (
      <div key={key} className={itemClassName} onClick={this.handleMonthClick.bind(this, key)}>
        <span>{m}</span>
      </div>
    );
  };

  public handleMonthClick = (i: number) => {
    const { current, onChange, type, disabled } = this.props;

    if (disabled) {
      return;
    }
    const date = new Date(current.getTime());
    const isMonth = type === 'month';

    date.setMonth(i, 1);
    onChange(date, isMonth);
    if (!isMonth) {
      this.props.onModeChange('day');
    }
  };

  public handleYear = (year: number) => {
    const { current, onChange, disabled } = this.props;
    if (disabled) {
      return;
    }
    onChange(addYears(current, year));
  };

  public handlePrevYear = () => {
    this.handleYear(-1);
  };

  public handleNextYear = () => {
    this.handleYear(1);
  };
}

export default Month;
