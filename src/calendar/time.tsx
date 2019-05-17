import * as React from 'react';
import * as classNames from 'classnames';
import { toDate } from './utils';
import { PickerChildProps } from './typings';
import TimeScroll from './time-scroll';

export type TimeProps = PickerChildProps;

export type TimeState = {
  current: Date;
};

class Time extends React.PureComponent<TimeProps, TimeState> {
  public static getDerivedStateFromProps(nextProps: TimeProps, prevState: TimeState) {
    if (nextProps.current.getTime() !== prevState.current.getTime()) {
      return {
        current: nextProps.type === 'time' ? prevState.current : nextProps.current,
      };
    }
    return null;
  }
  constructor(props: TimeProps) {
    super(props);

    this.state = {
      current: props.current,
    };
  }

  public render() {
    const { type, format, className, prefixCls } = this.props;
    const { current } = this.state;
    const date = toDate(current);
    const hours =
      format.indexOf('h') >= 0 && date.getHours() >= 12 ? date.getHours() - 12 : date.getHours();

    return (
      <div className={classNames(`${prefixCls}-time`, className)}>
        <div className={`${prefixCls}-time-container`}>
          {format.indexOf('H') >= 0 && (
            <TimeScroll
              prefixCls={prefixCls}
              value={date.getHours()}
              total={24}
              onChange={this.handleChange.bind(this, 'hour')}
            />
          )}
          {format.indexOf('h') >= 0 && (
            <TimeScroll
              prefixCls={prefixCls}
              value={hours}
              total={12}
              onChange={this.handleChange.bind(this, 'hour')}
            />
          )}
          {format.indexOf('m') >= 0 && (
            <TimeScroll
              prefixCls={prefixCls}
              total={60}
              value={date.getMinutes()}
              onChange={this.handleChange.bind(this, 'minute')}
            />
          )}
          {format.indexOf('s') >= 0 && (
            <TimeScroll
              prefixCls={prefixCls}
              total={60}
              value={date.getSeconds()}
              onChange={this.handleChange.bind(this, 'second')}
            />
          )}
        </div>
        {type !== 'datetime' ? (
          <div className={`${prefixCls}-time-footer`}>
            <div className={`${prefixCls}-time-cancel`} onClick={this.handleCancel}>
              Cancel
            </div>
            <div className={`${prefixCls}-time-confirm`} onClick={this.handleConfirm}>
              OK
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  public handleChange = (mode: string, val: number) => {
    const { format, type, onChange } = this.props;
    const { current } = this.state;
    const date = toDate(current);
    switch (mode) {
      case 'hour':
        if (format.indexOf('h') >= 0 && date.getHours() >= 12) {
          date.setHours(val + 12);
        } else {
          date.setHours(val);
        }
        break;
      case 'minute':
        date.setMinutes(val);
        break;
      case 'second':
        date.setSeconds(val);
        break;
      case 'ampm':
        const hours = date.getHours();
        if (val === 1 && hours < 12) {
          date.setHours(hours + 12);
        } else if (val === 0 && hours >= 12) {
          date.setHours(hours - 12);
        }
        break;
      default:
    }
    this.setState({
      current: date,
    });
    if (type === 'datetime') {
      onChange(date);
    }
  };

  public handleConfirm = () => {
    const { onChange } = this.props;
    const { current } = this.state;
    const date = toDate(current);
    onChange(date, true);
  };

  public handleCancel = () => {
    const { current, onChange } = this.props;
    this.setState({
      current,
    });
    onChange(current, true);
  };
}

export default Time;
