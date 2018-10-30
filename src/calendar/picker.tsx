import * as React from 'react';
import { BasicProps, CalendarMode } from './types';
import Time from './time';
import Day from './day';
import Month from './month';
import Year from './year';

export type PickerProps = BasicProps & {
  current: Date;
  format: string;
  onDayHover?: (date: Date) => void;
};
export type PickerState = {
  mode: CalendarMode;
};

class Picker extends React.PureComponent<PickerProps, PickerState> {
  constructor(props: PickerProps) {
    super(props);
    let mode: CalendarMode;
    switch (props.type) {
      case 'week':
      case 'datetime':
        mode = 'day';
        break;
      default:
        mode = props.type;
        break;
    }
    this.state = {
      mode,
    };
  }

  render() {
    const { mode } = this.state;
    let PickerChild;
    switch (mode) {
      case 'time': {
        PickerChild = Time;
        break;
      }
      case 'month': {
        PickerChild = Month;
        break;
      }
      case 'year': {
        PickerChild = Year;
        break;
      }
      default: {
        PickerChild = Day;
        break;
      }
    }
    return (
      <PickerChild {...this.props} onModeChange={this.handleModeChange} />
    );
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

