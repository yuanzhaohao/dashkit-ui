import * as React from 'react';
import { PickerProps } from './types';
import Basic from './basic';

export type DatePickerProps = PickerProps;

class DatePicker extends React.PureComponent<DatePickerProps> {
  render() {
    const { ...attributes } = this.props;

    return (
      <Basic
        type="date"
        placeholder="Select date"
        {...attributes}
      />
    );
  }
}

export default DatePicker;
