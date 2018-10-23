import * as React from 'react';
import * as classNames from 'classnames';
import Scrollbars from '../scrollbar';
import { rangeNumber } from '../utils/number';
import { pad } from './utils';

export type TimeScrollProps = {
  prefixCls?: string;
  total?: number;
  value: number;
  onChange: (num: number) => void;
};
export type TimeScrollState = {
  hideTrack: boolean;
};
const itemHeight = 32;

class Time extends React.PureComponent<TimeScrollProps, TimeScrollState> {
  constructor(props: TimeScrollProps) {
    super(props);
    this.state = {
      hideTrack: false,
    }
  }

  componentDidMount() {
    const { value } = this.props;
    this.refs.scrollbars.scrollTop(value * itemHeight);
  }

  render() {
    const { prefixCls, value, total = 0 } = this.props;

    return (
      <Scrollbars
        className={`${prefixCls}-time-scroll`}
        ref="scrollbars"
      >
        <div className={`${prefixCls}-time-list`}>
          {rangeNumber(total, 0).map(num =>
            <span
              key={num}
              className={classNames({
                [`${prefixCls}-time-item`]: true,
                [`${prefixCls}-time-item-active`]: num === value
              })}
              onClick={this.handleItemClick.bind(this, num)}
            >
              {pad(num)}
            </span>
          )}
        </div>
      </Scrollbars>
    );
  }

  handleItemClick = (num: number) => {
    const { onChange } = this.props;
    this.refs.scrollbars.scrollTop(num * itemHeight, 120);
    onChange(num);
  }
}

export default Time;
