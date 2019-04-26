import './style.scss';

import * as React from 'react';
import { createPortal, findDOMNode } from 'react-dom';
import * as classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import { CalendarType, DateProps } from './types';
// import Input from '../input';
import Icon from '../icon';
import Picker from './picker';
import Range from './range';
import { allPlaceholders, allFormats, isDate, addMonths, parseDate, formatDate, isSameMonth } from './utils';


export type CalendarProps = {
  prefixCls?: string;
  className?: string;
  disabled?: boolean;
  visible?: boolean;
  value?: any;//DateProps | DateProps[];
  format?: string;
  type: CalendarType;
  range?: boolean;
  min?: DateProps;
  max?: DateProps;
  placeholder?: string;
  onChange?: (date: Date | Date[], dateStr: string | string[]) => void;
};

export type CalendarState = {
  current: Date | Date[];
  visible?: boolean;
  value?: any;//DateProps | DateProps[];
  position: {
    top: number;
    left: number;
  }
};

class Calendar extends React.PureComponent<CalendarProps, CalendarState> {
  readonly calendarElement: React.RefObject<HTMLDivElement>;
  readonly panelElement: React.RefObject<HTMLDivElement>;

  static defaultProps = {
    prefixCls: 'dk-calendar',
    type: 'day',
  };

  static getDerivedStateFromProps(nextProps: CalendarProps) {
    const state: Partial<CalendarState> = {};
    if ('visible' in nextProps) {
      state.visible = !!nextProps.visible;
    }
    if ('value' in nextProps && nextProps.value) {
      if (nextProps.value instanceof Array) {
        if (isDate(nextProps.value[0]) && isDate(nextProps.value[1])) {
          state.value = nextProps.value;
        }
      } else if (isDate(nextProps.value)) {
        state.value = nextProps.value;
      }
    }
    return state;
  }

  constructor(props: CalendarProps) {
    super(props);
    this.calendarElement = React.createRef();
    this.panelElement = React.createRef();
    this.state = {
      current: this.getCurrent(),
      visible: false,
      value: props.range ? [] : '',
      position: {
        top: 0,
        left: 0,
      },
    };
  }

  render() {
    const {
      className,
      prefixCls,
      type,
      range,
      disabled,
      onChange,
      ...attributes
    } = this.props;
    const { value, position, visible } = this.state;
    const format = this.getFormat();
    const placeholder = this.getPlaceholder();
    const calendarClassName = classNames({
      [`${prefixCls}`]: true,
      [`${prefixCls}-disabled`]: disabled,
    }, className);
    const panelClassName = classNames({
      [`${prefixCls}-panel`]: true,
      [`${prefixCls}-panel-time`]: type === 'time',
      [`${prefixCls}-panel-range`]: !!range,
    });
    const calendarNode = (
      <CSSTransition
        in={visible}
        unmountOnExit
        timeout={300}
        classNames={`${prefixCls}-panel`}
        onEntered={this.bindDocumentClick}
        onExited={this.clearDocumentClick}
        onEnter={this.handleEnter}
      >
        <div
          className={panelClassName}
          style={position}
          ref={this.panelElement}
        >
          {this.renderContent()}
        </div>
      </CSSTransition>
    );

    return (
      <span {...attributes} className={calendarClassName} ref={this.calendarElement}>
        {range ? (
          <div className={`${prefixCls}-range`}>
            <input
              placeholder={placeholder[0]}
              onFocus={this.handleInputFocus}
              value={
                value instanceof Array && value.length
                  ? formatDate(value[0], format)
                  : ''
              }
            />
            <span>~</span>
            <input
              placeholder={placeholder[1]}
              onFocus={this.handleInputFocus}
              value={
                value instanceof Array && value.length
                  ? formatDate(value[1], format)
                  : ''
              }
            />
          </div>
        ) : (
          <input
            className={`${prefixCls}-input`}
            placeholder={placeholder}
            onFocus={this.handleInputFocus}
            value={
              value && !(value instanceof Array)
                ? formatDate(value, format)
                : ''
            }
          />
        )}
        <Icon
          type={type === 'time' ? 'clock' : 'calendar'}
          className={`${prefixCls}-icon`}
        />
        {!disabled && createPortal(calendarNode, document.body)}
      </span>
    );
  }

  renderContent = () => {
    const { range, type = 'day', ...attributes } = this.props;
    const { current, value } = this.state;
    const format = this.getFormat();
    const childProps = {
      ...attributes,
      type,
      format,
      current,
      value,
      onChange: this.handleChange,
    };

    return (current instanceof Date
      ? <Picker {...childProps} current={current} />
      : <Range {...childProps} current={current} />
    );
  }

  getPosition = () => {
    const el = this.calendarElement.current;
    const rect = el.getBoundingClientRect();
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
    const left = scrollLeft + rect.left;
    const top = scrollTop + rect.top + rect.height;

    return {
      left,
      top,
    };
  }

  handleEnter = () => {
    const position = this.getPosition();
    this.setState({
      position,
    });
  }

  getPlaceholder = () => {
    const { placeholder, type = 'day', range } = this.props;
    if (placeholder !== undefined) {
      return placeholder;
    }
    if (range) {
      return allPlaceholders.range[type];
    }
    return allPlaceholders[type];
  }

  getFormat = () => {
    const { format, type = 'day' } = this.props;
    if (format) return format;
    return allFormats[type];
  }

  getDateFromValue(val?: DateProps | DateProps[]) {
    if (val && typeof val === 'string') {
      return parseDate(val, this.getFormat());
    }
    return new Date();
  }

  getCurrent = () => {
    const { value, range, type } = this.props;

    if (range) {
      let current = [new Date(), new Date()];
      if (value instanceof Array) {
        current = value.map((v) => {
          return this.getDateFromValue(v);
        });
        if (current.length === 1) {
          current[1] = new Date();
        }
      }
      if ((type === 'day' || type === 'datetime') && isSameMonth(current[0], current[1])) {
        current[1] = addMonths(current[0], 1);
      }
      if (type === 'datetime') {
        current[0].setHours(0);
        current[0].setMinutes(0);
        current[0].setSeconds(0);
        current[1].setHours(0);
        current[1].setMinutes(0);
        current[1].setSeconds(0);
      }
      return current;
    }
    return this.getDateFromValue(value);
  }

  handleInputFocus = () => {
    this.setState({
      visible: true,
    });
  }

  bindDocumentClick = () => {
    document.addEventListener('click', this.handleDocumentClick);
  }

  clearDocumentClick = () => {
    document.removeEventListener('click', this.handleDocumentClick);
  }

  handleExited = () => {
    this.clearDocumentClick();
  }

  handleDocumentClick = (event: any) => {
    const calendarEl = this.calendarElement.current;
    const contentEl = this.panelElement.current;
    const targetEl = event.target;
    if (
      !(
        targetEl === calendarEl ||
        (calendarEl && calendarEl.contains(targetEl)) ||
        targetEl === contentEl ||
        (contentEl && contentEl.contains(targetEl))
      )
    ) {
      this.setState({
        visible: false
      });
    }
  }

  handleChange = (date: Date | Date[], isSelect?: boolean) => {
    const { onChange, type } = this.props;

    let current = date;
    if (date instanceof Array) {
      current = [...date];
      if (isSameMonth(current[0], current[1])) {
        current[1] = addMonths(current[1], 1);
      }
    }

    if (type === 'time') {
      this.setState({
        current,
        value: date,
        visible: !isSelect,
      });
    } else if (isSelect) {
      this.setState({
        current,
        value: date,
        visible: false,
      });
      if (typeof onChange === 'function') {
        const format = this.getFormat();
        const dateStr = date instanceof Array
          ? date.map((d) => {
            return formatDate(d, format);
          })
          : formatDate(date, format);
        onChange(date, dateStr);
      }
    } else {
      setTimeout(() => {
        this.setState({
          current,
        });
      }, 0);
    }
  }
}

export default Calendar;

