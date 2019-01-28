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