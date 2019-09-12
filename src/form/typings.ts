export type FormAlign = 'right' | 'left' | 'top';
export type FormTriggerEvent = 'blur' | 'change' | 'focus';
export type FormItemStatus = 'error' | 'default' | 'success' | 'warning';
export type FormRule = {
  type: string;
  message: string;
  required: boolean;
  trigger: FormTriggerEvent[];
};
export type FormItemProps = {
  prefixCls: string;
  className: string;
  required: boolean;
  labelAlign: FormAlign;
  labelWidth: number;
  label: string;
  name: string;
  status: FormItemStatus;
  rule: Partial<FormRule>;
};

export type FormItemState = {
  message: string;
  status: FormItemStatus;
  isInValid: boolean;
  value: any;
};

export type FormProps = {
  prefixCls: string;
  className: string;
  labelAlign: FormAlign;
  labelWidth: number;
  labelSuffix: string;
  onSubmit: (
    event?: React.FormEvent,
    values?: { [key: string]: any },
    error?: Array<{ message: string }>,
  ) => void;
  onReset: (event?: React.FormEvent) => void;
  rules: {
    [key: string]: Partial<FormRule>;
  };
};

export type ContextProps = FormItemProps & {
  form: {
    rules: {
      [key: string]: Partial<FormRule>;
    };
    getFields: () => void;
    addField: (field: any) => void;
    removeField: (field: any) => void;
  };
};

export type CallbackFunction = (valid: boolean) => void;
