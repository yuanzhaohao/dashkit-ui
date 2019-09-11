import * as React from 'react';
import * as classNames from 'classnames';
import { createConsumer } from './context';
import { ContextProps, FormItemProps, FormItemState } from './typings';
import warning from '../utils/warning';
import { COMPONENT_TYPE } from './constants';

class FormItem extends React.Component<Partial<ContextProps>, FormItemState> {
  public static defaultProps = {
    prefixCls: 'dk-form',
    labelWidth: 100,
  };

  constructor(props: FormItemProps) {
    super(props);
    this.state = {
      message: props.rule && props.rule.message ? props.rule.message : '',
      isInValid: false,
    };
  }

  public componentDidMount() {
    const { form, name } = this.props;
    const rule = this.getRule();

    warning(!name, 'Form.Item', '`name` is required parameter`.');

    if (form && name) {
      form.addField({
        [name]: {
          name,
          message: rule.message,
        },
      });
    }
  }

  public componentWillUnmount() {
    const { form, name } = this.props;

    if (form && name) {
      form.removeField(name);
    }
  }

  public render() {
    const {
      children,
      prefixCls,
      className,
      labelAlign,
      labelWidth,
      name,
      label,
      rule,
      ...attributes
    } = this.props;
    const { message, isInValid } = this.state;
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
    const realRule = this.getRule();

    const newChildren = React.Children.map(children, (child: any) => {
      console.log(child);
      const { componentType } = child.type;
      if (COMPONENT_TYPE[componentType]) {
        const newProps = {
          ...child.props,
        };
        if (realRule.trigger && realRule.trigger.length) {
          if (realRule.trigger.indexOf('change') !== -1) {
            newProps.onChange = (value: any) => {
              this.handleChange(value);
              if (child.props.onChange) {
                child.props.onChange(value);
              }
            };
          }

          if (realRule.trigger.indexOf('blur') !== -1) {
            newProps.onBlur = (...args) => {
              this.handleBlur();
              if (child.props.onBlur) {
                child.props.onBlur(...args);
              }
            };
          }
        }

        return React.cloneElement(child, newProps);
      }
      return child;
    });

    return (
      <div className={itemClassName} {...attributes}>
        <div
          className={labelClassName}
          style={{
            width: labelWidth,
          }}
        >
          {label}
        </div>
        <div
          className={`${prefixCls}-item-content`}
          style={{
            marginLeft: labelAlign !== 'top' ? labelWidth : 0,
          }}
        >
          {newChildren}
          {message && isInValid ? <div className={`${prefixCls}-item-tips`}>{message}</div> : null}
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
    const { name, rule, form } = this.props;
    if (rule) {
      return rule;
    }
    if (form && form.rules) {
      return form.rules[name] || {};
    }
    return {};
  };

  private handleChange = (value: any) => {
    console.log(value);
  };

  private handleBlur = () => {
    const { form, name } = this.props;
    console.log('call handleBlur');

    if (form && name) {
      const field = form.getFields()[name];
      console.log(form.getFields(), field, name);
      if (field && field.message && !field.value) {
        this.setState({
          message: field.message,
          isInValid: true,
        });
      }
    }
  };
}

export default createConsumer(FormItem);
