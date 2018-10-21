import * as React from 'react';
import { rangeNumber } from '../utils/number';
import { pad } from './utils';
import { Scrollbars } from 'react-custom-scrollbars';

export type TimeScrollProps = {
  prefixCls?: string;
  total?: number;
  value?: number;
  onChange?: (date: string) => void;
};

class Time extends React.PureComponent<TimeScrollProps> {
  constructor(props: TimeScrollProps) {
    super(props);
  }

  render() {
    const { prefixCls, total = 0 } = this.props;

    return (
      <Scrollbars style={{ width: 66, height: 224 }}>
      {/* <div className={`${prefixCls}-time-scroll`}> */}
        <div className={`${prefixCls}-time-list`}>
          {rangeNumber(total, 0).map(num =>
            <span
              key={num}
              className={`${prefixCls}-time-item`}
            >
              {pad(num)}
            </span>
          )}
        </div>
      {/* </div> */}
      </Scrollbars>
    );
  }
}

export default Time;
