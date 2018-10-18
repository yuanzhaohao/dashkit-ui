import * as React from 'react';
import * as classNames from 'classnames';
import { BasicProps } from './types';

export type TimeProps = BasicProps & {
  current: Date;
  onChange: (date: Date, isSelectDay?: boolean) => void;
};

class Time extends React.PureComponent<TimeProps> {
  constructor(props: TimeProps) {
    super(props);
  }

  render() {
    const { prefixCls, current } = this.props;

    return (
      <div className={`${prefixCls}-time`}>
        <div className={`${prefixCls}-time-item`}>

        </div>
        <div className={`${prefixCls}-time-item`}></div>
        <div className={`${prefixCls}-time-item`}></div>
      </div>
    );
  }
}

export default Time;
