import * as React from 'react';
import Picker from './picker';
import { DateProps, CalendarType } from './types';
import { compareAsc } from './utils';

export type RangeProps = {
  prefixCls?: string;
  current: Date[];
  value: DateProps[];
  format: string;
  type: CalendarType;
  range?: boolean;
  rangeDate?: DateProps[];
  onChange: (date: DateProps | DateProps[], isSelectDay?: boolean) => void;
};

export type RangeState = {
  rangeDate?: DateProps[];
};

class Range extends React.PureComponent<RangeProps, RangeState> {
  firstSelectDate?: Date;
  isSelectDate?: boolean;
  constructor(props: RangeProps) {
    super(props);
    this.state = {
      rangeDate: props.value,
    };
  }

  render() {
    const { current, type, value, prefixCls, ...attributes } = this.props;
    const { rangeDate } = this.state;
    const newType = type === 'week' ? 'day' : type;
    return (
      <div className={`${prefixCls}-range`}>
        <Picker
          {...attributes}
          prefixCls={prefixCls}
          type={newType}
          current={current[0]}
          rangeDate={rangeDate}
          onChange={this.handleChange.bind(this, 0)}
          onDayHover={this.handleDayHover}
        />
        <Picker
          {...attributes}
          prefixCls={prefixCls}
          type={newType}
          current={current[1]}
          rangeDate={rangeDate}
          onChange={this.handleChange.bind(this, 1)}
          onDayHover={this.handleDayHover}
        />
      </div>
    );
  }

  handleDayHover = (date: Date) => {
    const { rangeDate } = this.state;
    const { isSelectDate, firstSelectDate } = this;
    if (isSelectDate && firstSelectDate) {
      const diff = compareAsc(firstSelectDate, date);
      let newRangeDate = rangeDate;
      if (diff === -1) {
        newRangeDate = [firstSelectDate, date];
      } else if (diff === 1) {
        newRangeDate = [date, firstSelectDate];
      }
      this.setState({
        rangeDate: newRangeDate,
      });
    }
  }

  handleChange = (index: number, date: Date, isSelectDay?: boolean) => {
    const { rangeDate } = this.state;
    if (!isSelectDay) {
      const { current } = this.props;
      current[index] = date;
      this.props.onChange([...current]);
      return;
    }
    if (!this.isSelectDate) {
      this.firstSelectDate = date;
      this.isSelectDate = true;
      this.setState({
        rangeDate: [date],
      });
    } else if (this.firstSelectDate) {
      this.isSelectDate = false;
      const diff = compareAsc(this.firstSelectDate, date);

      if (diff === 0) {
        this.setState({
          rangeDate: undefined,
        });
        this.firstSelectDate = undefined;
        return;
      }
      let newRangeDate = rangeDate;

      if (diff === -1) {
        newRangeDate = [this.firstSelectDate, date];
      } else {
        newRangeDate = [date, this.firstSelectDate];
      }
      this.setState({
        rangeDate: newRangeDate,
      });
      this.firstSelectDate = undefined;
      this.props.onChange(newRangeDate, true);
    }
  }
}

export default Range;
