import * as React from 'react';
import * as classNames from 'classnames';
import Panel from './panel';

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
    const { prefixCls, visible, ...attibutes } = this.props;
    const node = (
      <div className={`${prefixCls}-wrapper`}>
        <div className={`${prefixCls}-mask`} />
        <Panel
          {...attibutes}
          prefixCls={prefixCls}
          visible={visible}
        />
      </div>
    );
    console.log(visible)
    if (visible) {
      return node;
      // return (
      //   createPortal(node, document.body)
      // );
    }
    return null;
  }
}

export default Modal;