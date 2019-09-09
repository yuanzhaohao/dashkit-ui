export type FormAlign = 'right' | 'left' | 'top';
export type FormRule = {
  type: string;
  message: string;
  required: boolean;
  triggle: string;
};
export type FormItemProps = {
  prefixCls: string;
  className: string;
  required: boolean;
  fieldName: string;
  labelAlign: FormAlign;
  labelWidth: number;
  label: string;
  rule: Partial<FormRule>;
};

export type FormItemState = {
  message: string;
  isValid: boolean;
};

export type FormProps = {
  prefixCls: string;
  className: string;
  labelAlign: FormAlign;
  labelWidth: number;
  labelSuffix: string;
  onSubmit: VoidFunction;
  rules: {
    [key: string]: Partial<FormRule>;
  };
};

export type ContextProps = FormItemProps & {
  form: {
    rules: {
      [key: string]: Partial<FormRule>;
    };
    addField: (field: any) => void;
    removeField: (field: any) => void;
  };
};

export type CallbackFunction = (valid: boolean) => void;
