import * as React from 'react';
import { createPortal } from 'react-dom';
import * as classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';

export type ModalProps = {
  prefixCls?: string;
  visible?: boolean;
  disabled?: boolean;
  title?: string;
  okText?: string;
  cancelText?: string;
  onConfirm?: VoidFunction;
  onCancel?: VoidFunction;
  onClose?: VoidFunction;
};

export type ModalState = {
  visible: boolean;
};

class Modal extends React.Component<ModalProps, ModalState> {
  static defaultProps = {
    prefixCls: 'dk-modal',
  };

  static getDerivedStateFromProps(nextProps: ModalProps) {
    const state: Partial<ModalProps> = {};
    if ('visible' in nextProps) {
      state.visible = !!nextProps.visible;
    }
    return state;
  }

  constructor(props: ModalProps) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  render() {
    const { prefixCls, title, children, disabled } = this.props;
    const titleNode = !!title && (
      <div className={`${prefixCls}-title`}>{title}</div>
    );

    const calendarNode = (
      <CSSTransition
        in={this.state.visible}
        unmountOnExit
        timeout={300}
        classNames={`${prefixCls}`}
      >

          <div
            className={classNames(`${prefixCls}`, {
            })}
          >
            {titleNode}
            <div className={`${prefixCls}-body`}>
              {children}
            </div>
          </div>
      </CSSTransition>
    );

    const node = (
      <div className={`${prefixCls}-wrapper`}>
        <div className={`${prefixCls}-mask`} />
        {calendarNode}
      </div>
    );
    if (!disabled) {
      return (
        createPortal(calendarNode, document.body)
      );
    }
    return null;
  }
}

export default Modal;