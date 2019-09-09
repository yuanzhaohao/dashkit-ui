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
  private fields: Array<typeof FormItem>;
  constructor(props: FormProps) {
    super(props);
    this.fields = [];
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
      <form {...attributes} className={formClassName} onSubmit={this.handleSubmit}>
        <Provider
          value={{
            labelAlign,
            form: {
              rules,
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
      onSubmit();
    }
  };

  private addField = (field: any) => {
    this.fields.push(field);
  };

  private removeField = (field: any) => {
    if (field.props.prop) {
      this.fields.splice(this.fields.indexOf(field), 1);
    }
  };
}

export default Form;
