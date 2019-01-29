import * as React from 'react';
import * as classNames from 'classnames';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
// import Panel from './panel';
import Icon from '../icon';
import Button from '../button';

const ESC_KEY = 27;

export type ModalProps = {
  prefixCls?: string;
  visible?: boolean;
  disabled?: boolean;
  closeByEsc?: boolean;
  title?: string;
  okText?: string;
  cancelText?: string;
  onConfirm?: VoidFunction;
  onCancel?: VoidFunction;
  onClose?: VoidFunction;
};

export type ModalState = {
  visible: boolean;
  bodyVisible: boolean;
};

class Modal extends React.Component<ModalProps, ModalState> {
  static defaultProps = {
    prefixCls: 'dk-modal',
    closeByEsc: true,
  };
  readonly bodyRef: React.RefObject<HTMLDivElement>;

  // static getDerivedStateFromProps(nextProps: ModalProps) {
  //   const state: Partial<ModalProps> = {};
  //   if ('visible' in nextProps) {
  //     state.visible = !!nextProps.visible;
  //   }
  //   return state;
  // }

  constructor(props: ModalProps) {
    super(props);
    this.state = {
      visible: false,
      bodyVisible: false,
    };
    this.bodyRef = React.createRef();
  }

  componentDidUpdate(prevProps: ModalProps, prevState: ModalState) {
    if (this.props.visible && !prevProps.visible) {
      this.openModal();
    } else if (!this.props.visible && prevProps.visible) {
      this.closeModal();
    }

    if (this.state.visible && !prevState.visible) {
      this.focusBody();
    }
  }

  render() {
    if (!this.state.visible) {
      return null;
    }

    const { prefixCls, visible, closeByEsc, title, children, ...attibutes } = this.props;

    const bodyNode = (
      <CSSTransition
        in={this.state.bodyVisible}
        unmountOnExit
        timeout={300}
        classNames={`${prefixCls}-panel`}
        onExited={this.handleExited}
      >
        <div
          className={`${prefixCls}-panel`}
          onKeyDown={this.handleKeydown}
          tabIndex={-1}
          ref={this.bodyRef}
        >
          <div className={classNames(`${prefixCls}-header`, {
            [`${prefixCls}-header`]: !!title,
          })}>{title}</div>
          <div className={`${prefixCls}-close`} onClick={this.props.onClose}>
            <Icon className={`${prefixCls}-close-icon`} type="x" />
          </div>
          <div className={`${prefixCls}-body`}>
            {children}
          </div>
          <div className={`${prefixCls}-footer`}>
            <Button type="default" onClick={this.props.onCancel}>Cancel</Button>
            <Button type="primary" className={`${prefixCls}-footer-confirm`} onClick={this.props.onConfirm}>OK</Button>
          </div>
        </div>
      </CSSTransition>
    );

    const node = (
      <div className={`${prefixCls}`}>
        <CSSTransition
          timeout={300}
          in={this.state.bodyVisible}
          classNames={`${prefixCls}-mask`}
        >
          <div className={`${prefixCls}-mask`} onClick={this.closeModal} />
        </CSSTransition>
        {bodyNode}
      </div>
    );
    return createPortal(node, document.body);
  }

  openModal = () => {
    this.setState({
      visible: true,
    }, () => {
      this.setState({
        bodyVisible: true,
      });
    })
  }

  closeModal = () => {
    this.setState({
      bodyVisible: false,
    });
  }

  handleExited = () => {
    const { onClose } = this.props;
    this.setState({
      visible: false,
    });
    if (typeof onClose === 'function') {
      onClose();
    }
  }

  focusBody = () => {
    // this.bodyRef.current.focus();
  }

  handleKeydown = event => {
    if (event.keyCode === ESC_KEY) {
      event.stopPropagation();
      this.closeModal();
    }
  }
}

export default Modal;