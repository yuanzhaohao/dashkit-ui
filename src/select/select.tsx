import * as React from 'react';
import { createPortal, findDOMNode } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import * as classNames from 'classnames';
import { SelectProps, SelectState, SelectSize } from './typings';
import { Provider } from './context';
import Option from './option';
import OptionGroup from './option-group';
import Input from '../input';

class Select extends React.PureComponent<SelectProps, SelectState> {
  public static Option: typeof Option;
  public static OptionGroup: typeof OptionGroup;
  public static defaultProps = {
    prefixCls: 'dk-select',
    size: 'default' as SelectSize,
  };
  public readonly selectElement: React.RefObject<HTMLDivElement>;
  public readonly panelElement: React.RefObject<HTMLDivElement>;

  public static getDerivedStateFromProps(nextProps: SelectProps) {
    if ('value' in nextProps) {
      return {
        value: nextProps.value,
      };
    }
    return null;
  }

  constructor(props: SelectProps) {
    super(props);
    this.selectElement = React.createRef();
    this.panelElement = React.createRef();
    this.state = {
      visible: false,
      options: props.multiple ? [] : '',
      inputValue: '',
      width: 0,
      position: {
        top: 0,
        left: 0,
      },
    };
  }

  public render() {
    const {
      className,
      prefixCls,
      size,
      children,
      disabled,
      value,
      multiple,
      onChange,
      prefix,
      name,
      prefixClassName,
      placeholder = 'Select',
      ...attributes
    } = this.props;
    const { position, width, options, inputValue, visible } = this.state;
    const iconClassName = classNames(`${prefixCls}-icon`, {
      [`${prefixCls}-icon-visible`]: visible,
    });
    const panelStyle = {
      ...position,
      width,
    };

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
        <div className={`${prefixCls}-panel`} style={panelStyle} ref={this.panelElement}>
          <Provider
            value={{
              prefixCls,
              options,
              inputValue,
              onRawChange: this.handleRawChange,
            }}
          >
            {children}
          </Provider>
        </div>
      </CSSTransition>
    );

    if (options instanceof Array) {
      return null;
    }
    return (
      <>
        <Input
          {...attributes}
          wrapperRef={this.selectElement}
          placeholder={options.toString() || placeholder}
          value={inputValue}
          disabled={disabled}
          size={size}
          name={name}
          onChange={this.handleInputChange}
          onFocus={this.handleInputFocus}
          prefix={prefix}
          prefixClassName={prefixClassName}
          suffix="chevron-down"
          wrapperClassName={className}
          suffixClassName={iconClassName}
        />
        {!disabled && createPortal(selectNode, document.body)}
      </>
    );
  }

  public bindDocumentClick = () => {
    document.addEventListener('click', this.handleDocumentClick);
  };

  public clearDocumentClick = () => {
    document.removeEventListener('click', this.handleDocumentClick);
  };

  public handleExited = () => {
    this.clearDocumentClick();
  };

  public handleDocumentClick = (event: any) => {
    const el = findDOMNode(this.selectElement.current) as Element;
    const contentEl = this.panelElement.current;
    const targetEl = event.target;
    if (
      !(
        targetEl === el ||
        (el && el.contains(targetEl)) ||
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
  };

  public getPosition = () => {
    const el = findDOMNode(this.selectElement.current) as Element;
    const rect = el.getBoundingClientRect();
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
    const left = scrollLeft + rect.left;
    const top = scrollTop + rect.top + rect.height;

    return {
      left,
      top,
    };
  };

  public handleEnter = () => {
    const position = this.getPosition();
    const el = findDOMNode(this.selectElement.current) as Element;
    const width = el.clientWidth || 0;
    this.setState({
      position,
      width,
    });
  };

  public handleInputFocus = () => {
    this.setState({
      visible: true,
      inputValue: '',
    });
  };

  public handleInputChange = (value: string) => {
    this.setState({
      inputValue: value,
    });
  };

  public handleRawChange = value => {
    const { options } = this.state;
    const { onChange } = this.props;
    const newOptions = options instanceof Array ? Array.from(new Set([...options, value])) : value;
    const newInputValue = newOptions instanceof Array ? '' : value;

    this.setState({
      options: newOptions,
      inputValue: newInputValue,
      visible: false,
    });

    if (typeof onChange === 'function') {
      onChange(newOptions);
    }
  };
}

export default Select;
