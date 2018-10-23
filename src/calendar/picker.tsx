import * as React from 'react';
import { BasicProps, CalendarMode } from './types';
import Time from './time';
import Day from './day';
import Month from './month';
import Year from './year';
import { CalendarType } from './index';

export type PickerProps = BasicProps & {
  type: CalendarType;
  format: string;
  current: Date;
};

export type PickerState = {
  mode: CalendarMode;
};

class Picker extends React.PureComponent<PickerProps, PickerState> {
  constructor(props: PickerProps) {
    super(props);
    let mode
    switch (props.type) {
      case 'year':
        mode = 'year';
        break;
      case 'month':
        mode = 'month';
        break;
      case 'time':
        mode = 'time';
        break
      default:
        mode = 'day';
    }

    this.state = {
      mode,
    };
  }

  render() {
    const { type, value, current, format, prefixCls, disabled, onChange } = this.props;
    const { mode } = this.state;

    switch (mode) {
      case 'year': {
        return (
          <Year
            current={current}
            prefixCls={prefixCls}
            disabled={disabled}
            onChange={onChange}
            value={value}
          />
        );
      }

      case 'month': {
        return (
          <Month
            current={current}
            prefixCls={prefixCls}
            disabled={disabled}
            onChange={onChange}
            value={value}
            onModeChange={this.handleModeChange}
          />
        );
      }

      case 'time': {
        return (
          <Time
            format={format}
            current={current}
            value={value}
            prefixCls={prefixCls}
            disabled={disabled}
            onChange={onChange}
          />
        );
      }

      default: {
        return (
          <Day
            type={type === 'week' ? 'week' : 'day'}
            current={current}
            prefixCls={prefixCls}
            disabled={disabled}
            onChange={onChange}
            value={value}
            onModeChange={this.handleModeChange}
          />
        );
      }
    }
  }

  handleModeChange = (mode: CalendarMode) => {
    setTimeout(() => {
      this.setState({
        mode,
      });
    }, 10);
  }
}

export default Picker;

