export type FormAlign = 'right' | 'left' | 'top';
export type FormTriggerEvent = 'blur' | 'change' | 'focus';
export type FormItemStatus = 'error' | 'default' | 'success' | 'warning';

export type FormValues = {
  [key: string]: any;
};

export type FormErrors = Array<{ message: string }>;

export type FormRule = {
  type: string;
  message: string;
  required: boolean;
  trigger: FormTriggerEvent[];
  validator: (formFields: FormValues, value: any, callback: (message: string) => void) => void;
};
export type FormFields = {
  [key: string]: {
    name?: string;
    value?: any;
    rule?: FormRule;
    component?: any;
  };
};
export type FormItemProps = {
  prefixCls: string;
  className: string;
  required: boolean;
  labelAlign: FormAlign;
  labelWidth: number;
  labelClassName: string;
  label: string;
  name: string;
  status: FormItemStatus;
  rule: Partial<FormRule>;
};

export type FormItemState = {
  message: string;
  status: FormItemStatus;
  isInvalid: boolean;
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
    forms?: {
      reset: () => void;
    },
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
    getFields: () => FormFields;
    getFieldsValues: () => FormValues;
    addField: (field: any) => void;
    removeField: (field: any) => void;
  };
};
