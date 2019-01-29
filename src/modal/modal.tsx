import * as React from 'react';
import { createPortal } from 'react-dom';
import { ModalProps } from './types';
import Panel from './panel';

class Modal extends React.Component<ModalProps> {
  static success: any;
  static info: any;
  static warning: any;
  static warn: any;
  static error: any;
  static confirm: any;

  render() {
    const node = (
      <Panel {...this.props} />
    );
    return createPortal(node, document.body);
  }
}

export default Modal;