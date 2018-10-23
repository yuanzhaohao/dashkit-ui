import * as React from 'react';
import * as classNames from 'classnames';
import { BasicProps } from './types';
import { addYears, isSameYear } from './utils';
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
    const year = current.getFullYear() - Math.floor(rangeTotal / 2);
    const years = rangeNumber(rangeTotal, 0).map(i => year + i);

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
              <span>{years[0]} ~ {years[years.length - 1]}</span>
            </div>
            <Icon
              className={`${prefixCls}-next`}
              type="chevrons-right"
              onClick={this.handleNextRange}
            />
          </div>
        </div>
        <div className={`${prefixCls}-list`}>
          {years.map((year) =>
            <div
              key={year}
              className={classNames({
                [`${prefixCls}-month-item`]: true,
                [`${prefixCls}-month-item-active`]: value && isSameYear(year, value),
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
    this.handleYear(-rangeTotal);
  }

  handleNextRange = () => {
    this.handleYear(rangeTotal);
  }
}

export default Year;
