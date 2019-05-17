export type ModalProps = {
  prefixCls?: string;
  className?: string;
  visible?: boolean;
  disabled?: boolean;
  showFooter?: boolean;
  closeByEsc?: boolean;
  title?: string;
  okText?: string;
  cancelText?: string;
  onConfirm?: VoidFunction;
  onCancel?: VoidFunction;
  onClose?: VoidFunction;
  footer?: React.ReactNode;
  width?: number;
};

export type ModalState = {
  visible: boolean;
  bodyVisible: boolean;
};

export type ModalType = 'success' | 'info' | 'warning' | 'error' | 'confirm';
