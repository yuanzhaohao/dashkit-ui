import * as React from 'react';
import { createPortal } from 'react-dom';
import * as classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import Icon from '../icon';
import Button from '../button';

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
  }
}

export default Modal;