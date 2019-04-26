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
      options: props.multiple ? [] : undefined,
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
    const { position, options, visible } = this.state;
    const selectClassName = classNames(
      prefixCls,
      {
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
              onRawChange: this.handleRawChange,
            }}
          >
            {children}
          </SelectProvider>
        </div>
      </CSSTransition>
    );
    console.log(options);
    return (
      <div {...attributes} className={selectClassName} ref={this.selectElement}>
        {options instanceof Array
          ? <></>
          : <input
            className={`${prefixCls}-input`}
            placeholder="Select"
            value={options}
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
      this.setState({
        visible: false
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
    });
  }

  handleRawChange = (value) => {
    const { options } = this.state;
    const { onChange } = this.props;
    const newOptions = options instanceof Array
      ? Array.from(new Set([...options, value]))
      : value;

    this.setState({
      options: newOptions,
      visible: false,
    });

    if (typeof onChange === 'function') {
      onChange(newOptions);
    }
  }
}

export default Select;
