export type CheckboxProps = {
  prefixCls?: string;
  className?: string;
  checked?: boolean;
  type: 'checkbox' | 'radio';
  value?: string;
  indeterminate?: boolean;
  disabled?: boolean;
  defaultChecked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};