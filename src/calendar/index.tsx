import './style.scss';

import * as React from 'react';
import * as classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import { BasicProps, DateProps } from './types';
import Input from '../input';
import Icon from '../icon';
import Picker from './picker';
import { parseDate, isDate, formatDate } from './utils';

export type CalendarType = 'time' | 'day' | 'week' | 'month' | 'year';
export type CalendarProps = BasicProps & {
  type?: CalendarType;
  placeholder?: string;
  range?: boolean;
  onChange?: (date: Date, dateStr: string) => void;
};

export type CalendarState = {
  current: Date;
  active?: boolean;
  value?: DateProps;
};
const allPlaceholders = {
  'time': 'Select Time',
  'day': 'Select Date',
  'week': 'Select Week',
  'month': 'Select Month',
  'year': 'Select Year',
  'datetime': 'Select Datetime',
};
const allFormats = {
  'time': 'HH:mm:ss',
  'day': 'yyyy-MM-dd',
  'week': 'yyyy WW',
  'month': 'yyyy-MM',
  'year': 'yyyy',
  'datetime': 'yyyy-MM-dd HH:mm:ss',
}

class Calendar extends React.PureComponent<CalendarProps, CalendarState> {
  readonly dateElement: React.RefObject<HTMLDivElement>;

  static defaultProps = {
    prefixCls: 'dk-calendar',
    type: 'day',
  };

  constructor(props: CalendarProps) {
    super(props);
    this.dateElement = React.createRef();
    this.state = {
      current: this.getCurrent(),
      active: false,
      value: undefined,
    };
  }

  render() {
    const { className, prefixCls, type } = this.props;
    const dateClassName = classNames({
      [`${prefixCls}`]: true,
    }, className);
    const { value } = this.state;
    const format = this.getFormat();

    return (
      <span className={dateClassName} ref={this.dateElement}>
        <Input
          className={`${prefixCls}-input`}
          placeholder={this.getPlaceholder()}
          onFocus={this.handleInputFocus}
          // onChange={this.handleInputChange}
          value={value ? formatDate(value, format) : undefined}
        />
        <Icon type={type === 'time' ? 'clock' : 'calendar'} className={`${prefixCls}-icon`} />
        <CSSTransition
          in={this.state.active}
          unmountOnExit
          timeout={300}
          classNames={`${prefixCls}-content`}
          onEntered={this.bindDocumentClick}
          onExited={this.clearDocumentClick}
        >
          <div className={`${prefixCls}-content`}>
            {this.renderContent()}
          </div>
        </CSSTransition>
      </span>
    );
  }

  renderContent = () => {
    const { range, type = 'day', prefixCls, disabled } = this.props;
    const { current, value } = this.state;
    const Component = range ? Picker : Picker;
    const format = this.getFormat();

    return (
      <Component
        type={type}
        format={format}
        current={current}
        value={value}
        prefixCls={prefixCls}
        disabled={disabled}
        onChange={this.handleChange}
      />
    );
  }

  getPlaceholder = () => {
    const { placeholder, type = 'day' } = this.props;
    if (placeholder !== undefined) return placeholder;
    return allPlaceholders[type];
  }

  getFormat = () => {
    const { format, type = 'day' } = this.props;
    if (format) return format;
    return allFormats[type];
  }

  getCurrent = () => {
    const { value } = this.props;

    if (value && typeof value === 'string')  {
      return parseDate(value, this.getFormat());
    }
    return new Date;
  }

  handleInputFocus = () => {
    this.setState({
      active: true,
    });
  }

  bindDocumentClick = () => {
    document.addEventListener('click', this.handleDocumentClick);
  }

  clearDocumentClick = () => {
    document.removeEventListener('click', this.handleDocumentClick);
  }

  handleDocumentClick = (event: any) => {
    const element = this.dateElement.current;
    if (!(event.target === element || (element && element.contains(event.target)))) {
      this.setState({
        active: false,
      });
    }
  }

  handleChange = (date: Date, isSelectDay?: boolean) => {
    const { onChange, type } = this.props;

    if (type === 'time') {
      this.setState({
        current: date,
        value: date,
      });
    } else {
      if (isSelectDay) {
        this.setState({
          current: date,
          value: date,
          active: false,
        });
        if (typeof onChange === 'function') {
          const format = this.getFormat();
          const dateStr = formatDate(date, format);
          onChange(date, dateStr);
        }
      } else {
        this.setState({
          current: date,
        });
      }
    }
  }
}

export default Calendar;

