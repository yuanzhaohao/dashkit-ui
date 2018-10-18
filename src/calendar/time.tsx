import * as React from 'react';
import * as classNames from 'classnames';
import { toDate } from './utils';
import { BasicProps } from './types';
import TimeScroll from './time-scroll';

export type TimeProps = BasicProps & {
  current: Date;
  format: string;
  onChange: (date: Date, isSelectDay?: boolean) => void;
};

class Time extends React.PureComponent<TimeProps> {
  constructor(props: TimeProps) {
    super(props);
  }

  render() {
    const { prefixCls, value, current, format } = this.props;
    console.log(value, format)
    const date = toDate(value || current);
    const hours = format.indexOf('h') >= 0 && date.getHours() >= 12
      ? date.getHours() - 12
      : date.getHours();

    console.log(format.indexOf('H') >= 0);
    return (
      <div className={`${prefixCls}-time`}>
        {
          format.indexOf('H') >= 0 &&
          <TimeScroll prefixCls={prefixCls} value={date.getHours()} total={24} onChange={this.handleChange} />
        }
        {
          format.indexOf('h') >= 0 &&
          <TimeScroll prefixCls={prefixCls} value={hours} total={12} onChange={this.handleChange} />
        }
        {
          format.indexOf('m') >= 0 &&
          <TimeScroll prefixCls={prefixCls} value={date.getMinutes()} onChange={this.handleChange} />
        }
        {
          format.indexOf('s') >= 0 &&
          <TimeScroll prefixCls={prefixCls} value={date.getSeconds()} onChange={this.handleChange} />
        }
      </div>
    );
  }

  handleChange = () => {

  }
}

export default Time;
