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
  autoHide: boolean;
};
const itemHeight = 32;

class Time extends React.PureComponent<Partial<TimeScrollProps>, TimeScrollState> {
  public readonly scrollRef: React.RefObject<Scrollbars>;

  constructor(props: TimeScrollProps) {
    super(props);
    this.state = {
      autoHide: false,
    };
    this.scrollRef = React.createRef();
  }

  public componentDidMount() {
    const { value } = this.props;
    const scrollbarElement = this.scrollRef.current;
    if (scrollbarElement) {
      setTimeout(() => {
        scrollbarElement.scrollTop(value * itemHeight);
        setTimeout(() => {
          this.setState({
            autoHide: true,
          });
        }, 50);
      }, 0);
    }
  }

  public render() {
    const { prefixCls, value, total = 0 } = this.props;

    return (
      <Scrollbars
        className={`${prefixCls}-time-scroll`}
        ref={this.scrollRef}
        autoHide={this.state.autoHide}
      >
        <div className={`${prefixCls}-time-list`}>
          {rangeNumber(total, 0).map(num => (
            <span
              key={num}
              className={classNames({
                [`${prefixCls}-time-item`]: true,
                [`${prefixCls}-time-item-active`]: num === value,
              })}
              onClick={this.handleItemClick.bind(this, num)}
            >
              {pad(num)}
            </span>
          ))}
        </div>
      </Scrollbars>
    );
  }

  public handleItemClick = (num: number) => {
    const { onChange } = this.props;
    const scrollbarElement = this.scrollRef.current;
    if (scrollbarElement) {
      scrollbarElement.scrollTop(num * itemHeight, 120);
    }
    onChange(num);
  };
}

export default Time;
