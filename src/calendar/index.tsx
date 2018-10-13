import './style.scss';

import * as React from 'react';
import * as classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import { format as fnsFormat } from 'date-fns';
import { BasicProps, ValueProps } from './types';
import Input from '../input';
import Icon from '../icon';
import Day from './day';
import Month from './month';
import { toDateWithFormat, isInvalid } from './utils';

export type CalendarType = 'day' | 'week' | 'month' | 'time' | 'datetime';
export type CalendarProps = BasicProps & {
  type?: CalendarType;
  placeholder?: string;
  range?: boolean;
  onChange?: (date: Date, dateStr: string) => void;
};

export type CalendarState = {
  current: Date;
  active?: boolean;
  value?: ValueProps;
};
const allPlaceholders = {
  'day': 'Select date',
  'month': 'Select Month',
  'time': 'Select Time',
  'week': 'Select Week',
  'datetime': 'Select Datetime',
  'range': 'Select date',
};
const allFormats = {
  'day': 'yyyy-MM-dd',
  'month': 'yyyy-MM',
  'time': 'HH:mm:ss',
  'week': 'yyyy ww',
  'datetime': 'yyyy-MM-dd HH:mm:ss',
  'range': 'yyyy-MM-dd',
}

class BasicPicker extends React.PureComponent<CalendarProps, CalendarState> {
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
    const { className, prefixCls } = this.props;
    const dateClassName = classNames({
      [`${prefixCls}`]: true,
    }, className);
    const { value } = this.state;
    const date = value ? this.parseDate(value) : undefined;
    const format = this.getFormat();

    return (
      <span className={dateClassName} ref={this.dateElement}>
        <Input
          className={`${prefixCls}-input`}
          placeholder={this.getPlaceholder()}
          onFocus={this.handleInputFocus}
          onChange={this.handleInputChange}
          value={!isInvalid(date) && date ? fnsFormat(date, format) : undefined}
        />
        <Icon type="calendar" className={`${prefixCls}-icon`} />
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
    const { type = 'day', prefixCls, disabled } = this.props;
    const { current, value } = this.state;

    switch (type) {
      case 'day':
      case 'week': {
        return (
          <Day
            type={type}
            current={current}
            prefixCls={prefixCls}
            disabled={disabled}
            onChange={this.handleChange}
            value={this.parseDate(value)}
          />
        );
      }
      case 'month': {
        return (
          <Month
            current={current}
            prefixCls={prefixCls}
            disabled={disabled}
            onChange={this.handleChange}
            value={this.parseDate(value)}
          />
        );
      }
    }
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

  parseDate(value: ValueProps) {
    return toDateWithFormat(value, this.getFormat());
  }

  getCurrent = () => {
    const { value } = this.props;
    let current;

    if (value !== undefined)  {
      current = this.parseDate(value);
    } else {
      current = new Date;
    }
    return current;
  }

  handleInputFocus = () => {
    this.setState({
      active: true,
    });
  }

  handleInputChange = (date: any) => {
    // const format = this.getFormat();
    // const value = fnsFormat(date, format);
    // const { onChange } = this.props;
    // this.setState({
    //   value: date
    // });
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
    const { onChange } = this.props;
    const format = this.getFormat();
    const value = fnsFormat(date, format);

    if (isSelectDay) {
      this.setState({
        current: date,
        value,
        active: false,
      });
    } else {
      this.setState({
        current: date,
      });
    }
    if (typeof onChange === 'function') {
      onChange(date, value);
    }
  }
}

export default BasicPicker;

