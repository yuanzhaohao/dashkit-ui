import * as React from 'react';
import * as classNames from 'classnames';
import { BasicProps } from './types';
import { addYears, toDate } from './utils';
import { rangeNumber } from '../utils/number';
import Icon from '../icon';

export type YearProps = BasicProps & {
  current: Date;
};

const rangeTotal = 12;

class Year extends React.PureComponent<YearProps> {
  constructor(props: YearProps) {
    super(props);
  }

  render() {
    const { prefixCls, current, value } = this.props;
    const startYear = Math.floor(current.getFullYear() / 10) * 10;
    const years = rangeNumber(11, -1).map(i => startYear + i);

    return (
      <div className={`${prefixCls}-year`}>
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
                [`${prefixCls}-month-item`]: true,
                [`${prefixCls}-month-item-other`]: i === 0 || i === years.length - 1,
                [`${prefixCls}-month-item-active`]: year === toDate(value).getFullYear(),
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
    const { current, onChange, disabled } = this.props;

    if (disabled) {
      return;
    }
    const date = new Date(current.getTime());
    date.setFullYear(year);
    onChange(date, true);
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
