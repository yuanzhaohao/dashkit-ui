import * as classNames from 'classnames';
import * as React from 'react';
import { FormProps, FormAlign, CallbackFunction } from './typings';
import FormItem from './item';
import { Provider } from './context';

class Form extends React.Component<Partial<FormProps>> {
  public static Item: typeof FormItem;
  public static defaultProps = {
    prefixCls: 'dk-form',
    labelAlign: 'right' as FormAlign,
  };
  private fields: {
    [key: string]: {
      message?: string;
      name?: string;
      value?: any;
      component?: any;
    };
  };
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
            form: {
              rules,
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
    const { fields } = this;
    const values = {};
    const error = !Object.keys(fields).every(key => {
      return fields[key].component.checkValid();
    });
    Object.keys(fields).forEach(key => {
      values[key] = fields[key].component.state.value;
    });

    if (typeof onSubmit === 'function') {
      onSubmit(event, values, error);
    }
  };

  private handleReset = (event: React.FormEvent) => {
    const { onReset } = this.props;
    const { fields } = this;

    Object.keys(fields).forEach(key => {
      if (fields[key] && fields[key].component) {
        fields[key].component.resetField();
      }
    });
    if (typeof onReset === 'function') {
      onReset(event);
    }
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
}

export default Form;
