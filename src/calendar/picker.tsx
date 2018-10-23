import * as React from 'react';
import { BasicProps, CalendarMode } from './types';
import Time from './time';
import Day from './day';
import Month from './month';
import Year from './year';

export type PickerProps = BasicProps & {
  format: string;
  current: Date;
};

export type PickerState = {
  mode: CalendarMode;
};

class Picker extends React.PureComponent<PickerProps, PickerState> {
  constructor(props: PickerProps) {
    super(props);
    let mode: CalendarMode;
    switch (props.type) {
      case 'year':
      case 'month':
      case 'day':
      case 'time':
        mode = props.type;
        break;
      default:
        mode = 'day';
        break;
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
            type={type}
            format={format}
            current={current}
            prefixCls={prefixCls}
            disabled={disabled}
            onChange={onChange}
            value={value}
            onModeChange={this.handleModeChange}
          />
        );
      }

      case 'month': {
        return (
          <Month
            type={type}
            current={current}
            format={format}
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
            type={type}
            format={format}
            current={current}
            value={value}
            prefixCls={prefixCls}
            disabled={disabled}
            onChange={onChange}
            onModeChange={this.handleModeChange}
          />
        );
      }

      default: {
        return (
          <Day
            type={type === 'week' ? 'week' : 'day'}
            format={format}
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

