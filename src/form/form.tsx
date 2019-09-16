import * as classNames from 'classnames';
import * as React from 'react';
import { FormProps, FormAlign, FormFields } from './typings';
import FormItem from './item';
import { Provider } from './context';

class Form extends React.Component<Partial<FormProps>> {
  public static Item: typeof FormItem;
  public static defaultProps = {
    prefixCls: 'dk-form',
    labelAlign: 'right' as FormAlign,
  };
  public fields: FormFields;
  constructor(props: FormProps) {
    super(props);
    this.fields = {};
  }

  public render() {
    const {
      children,
      prefixCls,
      className,
      onSubmit,
      labelWidth,
      labelAlign,
      rules,
      ...attributes
    } = this.props;
    const formClassName = classNames(
      {
        [`${prefixCls}`]: true,
      },
      className,
    );

    return (
      <form
        {...attributes}
        className={formClassName}
        onSubmit={this.handleSubmit}
        onReset={this.handleReset}
      >
        <Provider
          value={{
            labelAlign,
            labelWidth,
            form: {
              rules,
              getFieldsValues: this.getFieldsValues,
              getFields: this.getFields,
              addField: this.addField,
              removeField: this.removeField,
            },
          }}
        >
          {children}
        </Provider>
      </form>
    );
  }

  private handleSubmit = (event: React.FormEvent) => {
    const { onSubmit } = this.props;
    const values = this.getFieldsValues();
    const errors = this.getFiledsErrors();

    if (typeof onSubmit === 'function') {
      onSubmit(event, values, errors.length === 0 ? undefined : errors.filter(error => !!error), {
        reset: this.reset,
      });
    }
  };

  private handleReset = (event: React.FormEvent) => {
    const { onReset } = this.props;

    this.reset();
    if (typeof onReset === 'function') {
      onReset(event);
    }
  };

  private reset = () => {
    const { fields } = this;

    Object.keys(fields).forEach(key => {
      if (fields[key] && fields[key].component) {
        fields[key].component.resetField();
      }
    });
  };

  private addField = (field: any) => {
    this.fields = {
      ...this.fields,
      ...field,
    };
  };

  private removeField = (name: string) => {
    if (this.fields[name]) {
      delete this.fields[name];
    }
  };

  private getFields = () => {
    return this.fields;
  };

  private getFieldsValues = () => {
    const { fields } = this;
    const values = {};
    Object.keys(fields).forEach(key => {
      values[key] = fields[key].component.state.value;
    });

    return values;
  };

  private getFiledsErrors = () => {
    const { fields } = this;
    const errors = [];

    Object.keys(fields).forEach(key => {
      const error = fields[key].component.checkInvalid();
      if (error && error.message) {
        errors.push(error);
      }
    });

    return errors;
  };
}

export default Form;
