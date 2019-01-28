import * as React from 'react';
import { createPortal } from 'react-dom';
import * as classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import Icon from '../icon';

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
  constructor(props: ModalProps) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  componentDidMount() {
    this.setState({
      visible: true,
    });
  }

  render() {
    const { prefixCls, title, children } = this.props;

    return (
      <CSSTransition
        in={this.state.visible}
        unmountOnExit
        timeout={300}
        classNames={`${prefixCls}-panel`}
      >
        <div
          className={`${prefixCls}-panel`}
        >
          {!!title && (
            <div className={`${prefixCls}-title`}>{title}</div>
          )}
          <Icon className={`${prefixCls}-close`} type="x" />
          <div className={`${prefixCls}-body`}>
            {children}
          </div>
        </div>
      </CSSTransition>
    );
  }
}

export default Modal;