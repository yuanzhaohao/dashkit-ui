import * as React from 'react';
import { createPortal } from 'react-dom';
import { ModalProps } from './types';
import Panel from './panel';

class Modal extends React.Component<ModalProps> {
  public static success: any;
  public static info: any;
  public static warning: any;
  public static warn: any;
  public static error: any;
  public static confirm: any;

  public render() {
    const node = <Panel {...this.props} />;
    return createPortal(node, document.body);
  }
}

export default Modal;
