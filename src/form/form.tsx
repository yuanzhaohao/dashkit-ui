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
    [key: string]: typeof FormItem;
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
    event.preventDefault();

    const { onSubmit } = this.props;
    console.log('call handleSubmit');

    if (typeof onSubmit === 'function') {
      onSubmit(event);
    }
  };

  private handleReset = (event: React.FormEvent) => {
    const { onReset } = this.props;
    console.log('call handleReset');

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
