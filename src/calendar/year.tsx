import * as React from 'react';
import * as classNames from 'classnames';
import { PickerChildProps } from './types';
import { addYears, toDate, isSameYear } from './utils';
import { rangeNumber } from '../utils/number';
import Icon from '../icon';

export type YearProps = PickerChildProps;

class Year extends React.PureComponent<YearProps> {
  constructor(props: YearProps) {
    super(props);
  }

  render() {
    const { prefixCls, current, value } = this.props;
    const startYear = Math.floor(current.getFullYear() / 10) * 10;
    const years = rangeNumber(11, -1).map(i => startYear + i);

    return (
      <div className={`${prefixCls}-ym`}>
        <div className={`${prefixCls}-header`}>
          <div className={`${prefixCls}-config`}>
            <Icon
              className={`${prefixCls}-prev`}
              type="chevrons-left"
              onClick={this.handlePrevRange}
            />
            <div className={`${prefixCls}-select`}>
              <span>{years[1]} ~ {years[years.length - 2]}</span>
            </div>
            <Icon
              className={`${prefixCls}-next`}
              type="chevrons-right"
              onClick={this.handleNextRange}
            />
          </div>
        </div>
        <div className={`${prefixCls}-list`}>
          {years.map((year, i) =>
            <div
              key={year}
              className={classNames({
                [`${prefixCls}-ym-item`]: true,
                [`${prefixCls}-ym-item-other`]: i === 0 || i === years.length - 1,
                [`${prefixCls}-ym-item-active`]: value &&  isSameYear(year, value),
              })}
              onClick={this.handleYearClick.bind(this, year)}
            >
              <span>{year}</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  handleYearClick = (year: number) => {
    const { current, onChange, disabled, type } = this.props;

    if (disabled) {
      return;
    }
    const date = new Date(current.getTime());
    const isYear = type === 'year';
    date.setFullYear(year);
    onChange(date, isYear);
    if (!isYear) {
      this.props.onModeChange('month');
    }
  }

  handleYear = (year: number) => {
    const { current, onChange, disabled } = this.props;
    if (disabled) {
      return;
    }
    onChange(addYears(current, year));
  }

  handlePrevRange = () => {
    this.handleYear(-10);
  }

  handleNextRange = () => {
    this.handleYear(10);
  }
}

export default Year;
