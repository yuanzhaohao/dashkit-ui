export type CheckboxProps = {
  prefixCls?: string;
  className?: string;
  checked?: boolean;
  label?: string;
  type: 'checkbox' | 'radio';
  indeterminate?: boolean;
  disabled?: boolean;
  defaultChecked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRawChange?: (checked?: boolean, label?: string) => void;
};