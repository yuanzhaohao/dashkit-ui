import * as React from 'react';
import * as classNames from 'classnames';
import { createConsumer } from './context';
import { ContextProps, FormItemProps, FormItemState } from './typings';

class FormItem extends React.Component<Partial<ContextProps>, FormItemState> {
  public static defaultProps = {
    prefixCls: 'dk-form',
    labelWidth: 100,
  };

  constructor(props: FormItemProps) {
    super(props);
    this.state = {
      message: '',
      isValid: false,
    };
  }

  public componentDidMount() {
    const { form } = this.props;

    if (form) {
      form.addField(this);
    }
  }

  public componentWillUnmount() {
    const { form } = this.props;

    if (form) {
      form.removeField(this);
    }
  }

  public render() {
    const {
      children,
      prefixCls,
      className,
      labelAlign,
      labelWidth,
      fieldName,
      label,
      ...attributes
    } = this.props;
    const { message } = this.state;
    const required = this.getRequired();

    const itemClassName = classNames(
      {
        [`${prefixCls}-item`]: true,
        [`${prefixCls}-item-required`]: this.getRequired(),
      },
      className,
    );
    const labelClassName = classNames({
      [`${prefixCls}-item-label`]: true,
      [`${prefixCls}-item-label-required`]: required,
      [`${prefixCls}-item-label-${labelAlign}`]: true,
    });
    const labelStyle = {
      width: labelWidth,
    };
    const contentStyle = {
      marginLeft: labelAlign !== 'top' ? labelWidth : 0,
    };

    return (
      <div className={itemClassName} {...attributes}>
        <div className={labelClassName} style={labelStyle}>
          {label}
        </div>
        <div className={`${prefixCls}-item-content`} style={contentStyle}>
          {children}
          {message ? <div className={`${prefixCls}-item-tips`}>{message}</div> : null}
        </div>
      </div>
    );
  }

  private getRequired = () => {
    const rule = this.getRule();
    const { required } = this.props;

    if (required !== undefined) {
      return required;
    }
    return rule.required;
  };

  private getRule = () => {
    const { fieldName, rule, form } = this.props;
    if (rule) {
      return rule;
    }
    if (form && form.rules) {
      return form.rules[fieldName] || {};
    }
    return {};
  };
}

export default createConsumer(FormItem);
