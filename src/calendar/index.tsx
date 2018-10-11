import './style.scss';

import * as React from 'react';
import * as classNames from 'classnames';
import * as PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import { PickerProps } from './types';
import Input from '../input';
import Icon from '../icon';
import Day from './day';
import utils from './utils';

export type BasicPickerType = 'day' | 'week' | 'month' | 'time' | 'datetime' | 'range';
export type BasicPickerProps = PickerProps & {
  type?: BasicPickerType;
  placeholder?: string;
  onChange?: (date: Date, dateStr: string) => void;
};

export type BasicPickerState = {
  current: Date;
  active: boolean;
  value?: string;
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
  'week': 'yyyy WW',
  'datetime': 'yyyy-MM-dd HH:mm:ss',
  'range': 'yyyy-MM-dd',
}

class BasicPicker extends React.PureComponent<BasicPickerProps, BasicPickerState> {
  readonly contentDiv: React.RefObject<HTMLDivElement>;

  static defaultProps = {
    prefixCls: 'dk-calendar',
    type: 'day',
    disabled: false,
  };

  constructor(props: BasicPickerProps) {
    super(props);
    this.contentDiv = React.createRef();
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

    return (
      <span className={dateClassName}>
        <Input
          className={`${prefixCls}-input`}
          placeholder={this.getPlaceholder()}
          onFocus={this.handleInputFocus}
          value={this.state.value}
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
          <div className={`${prefixCls}-content`} ref={this.contentDiv}>
            {this.renderContent()}
          </div>
        </CSSTransition>
      </span>
    );
  }

  renderContent = () => {
    const { type, prefixCls, disabled } = this.props;
    const { current } = this.state;

    switch (type) {
      default: {
        return (
          <Day
            current={current}
            prefixCls={prefixCls}
            disabled={disabled}
            onChange={this.handleChange}
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

  parseDate(value: any) {
    return utils.toDateWithFormat(value, this.getFormat());
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

  bindDocumentClick = () => {
    document.addEventListener('click', this.handleDocumentClick);
  }

  clearDocumentClick = () => {
    document.removeEventListener('click', this.handleDocumentClick);
  }

  handleDocumentClick = (event: any) => {
    const element = this.contentDiv.current;
    if (!(event.target === element || (element && element.contains(event.target)))) {
      this.setState({
        active: false,
      });
    }
  }

  handleChange = (date: Date) => {
    const { onChange } = this.props;
    const format = this.getFormat();
    const value = utils.format(date, format)

    this.setState({
      current: date,
      value,
      active: false,
    });
    if (typeof onChange === 'function') {
      onChange(date, value);
    }
  }
}

export default BasicPicker;

