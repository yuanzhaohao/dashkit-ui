import * as React from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import * as classNames from 'classnames';
import { SelectProps, SelectState, SelectSize } from './types';
import { Provider as SelectProvider } from './context';
import Icon from '../icon';

class Select extends React.PureComponent<SelectProps, SelectState> {
  static Option: any;
  readonly selectElement: React.RefObject<HTMLDivElement>;
  readonly panelElement: React.RefObject<HTMLDivElement>;
  static defaultProps = {
    prefixCls: 'dk-select',
    size: 'default' as SelectSize,
  };

  constructor(props: SelectProps) {
    super(props);
    this.selectElement = React.createRef();
    this.panelElement = React.createRef();
    this.state = {
      visible: false,
      options: props.multiple ? [] : '',
      inputValue: '',
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
      size,
      children,
      disabled,
      value,
      multiple,
      onChange,
      ...attributes
    } = this.props;
    const { position, options, inputValue, visible } = this.state;
    const selectClassName = classNames(
      prefixCls,
      {
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-large`]: size === 'large',
        [`${prefixCls}-small`]: size === 'small',
      },
      className,
    );
    const selectNode = (
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
          className={`${prefixCls}-panel`}
          style={position}
          ref={this.panelElement}
        >
          <SelectProvider
            value={{
              prefixCls,
              multiple,
              options,
              inputValue,
              onRawChange: this.handleRawChange,
            }}
          >
            {children}
          </SelectProvider>
        </div>
      </CSSTransition>
    );
    return (
      <div {...attributes} className={selectClassName} ref={this.selectElement}>
        {options instanceof Array
          ? <></>
          : <input
            className={`${prefixCls}-input`}
            placeholder={options.toString() || 'Select'}
            value={inputValue}
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
          />
        }

        <Icon type="chevron-down" className={`${prefixCls}-icon`} />
        {!disabled && createPortal(selectNode, document.body)}
      </div>
    );
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
    const calendarEl = this.selectElement.current;
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
      const { options } = this.state;
      this.setState({
        visible: false,
        inputValue: options instanceof Array ? '' : options.toString(),
      });
    }
  }

  getPosition = () => {
    const el = this.selectElement.current;
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

  handleInputFocus = () => {
    this.setState({
      visible: true,
      inputValue: '',
    });
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    this.setState({
      inputValue: value,
    });
  }

  handleRawChange = (value) => {
    const { options } = this.state;
    const { onChange } = this.props;
    const newOptions = options instanceof Array
      ? Array.from(new Set([...options, value]))
      : value;
    const newInputValue = newOptions instanceof Array ? '' : value;

    this.setState({
      options: newOptions,
      inputValue: newInputValue,
      visible: false,
    });

    if (typeof onChange === 'function') {
      onChange(newOptions);
    }
  }
}

export default Select;
