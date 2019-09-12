import * as React from 'react';
import * as classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import { createConsumer } from './context';
import { ContextProps, FormItemProps, FormItemState, FormItemStatus } from './typings';
import warning from '../utils/warning';
import { COMPONENT_TYPE, DEFAULT_TRIGGER } from './constants';

class FormItem extends React.Component<Partial<ContextProps>, FormItemState> {
  public static defaultProps = {
    prefixCls: 'dk-form',
    labelWidth: 100,
    theme: 'default' as FormItemStatus,
  };

  constructor(props: FormItemProps) {
    super(props);
    this.state = {
      status: 'default',
      value: undefined,
      message: props.rule && props.rule.message ? props.rule.message : '',
      isInValid: false,
    };
  }

  public componentDidMount() {
    const { form, name } = this.props;
    const rule = this.getRule();

    if (form && name) {
      form.addField({
        [name]: {
          name,
          rule,
          component: this,
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
      status: statusProp,
      ...attributes
    } = this.props;
    const { message, value, status, isInValid } = this.state;
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
      const { componentType } = child.type;
      if (COMPONENT_TYPE[componentType]) {
        // console.log(child);
        const newProps = {
          ...child.props,
          status,
          onChange: (value: any) => {
            this.handleChange(value);
            if (child.props.onChange) {
              child.props.onChange(value);
            }
          },
        };
        const trigger = Array.isArray(realRule.trigger)
          ? Array.from(new Set([...DEFAULT_TRIGGER, ...realRule.trigger]))
          : DEFAULT_TRIGGER;

        if (trigger.indexOf('blur') !== -1) {
          newProps.onBlur = (...args) => {
            this.handleBlur();
            if (child.props.onBlur) {
              child.props.onBlur(...args);
            }
          };
        }

        if (componentType === 'CheckboxGroup' || componentType === 'RadioGroup') {
          newProps.value = value;
        }

        return React.cloneElement(child, newProps);
      }
      return child;
    });

    const messageNode = (
      <CSSTransition
        in={!!(message && isInValid)}
        timeout={216}
        unmountOnExit
        classNames={`${prefixCls}-item-message`}
      >
        <div
          className={classNames(
            `${prefixCls}-item-message`,
            `${prefixCls}-item-message-${this.state.status}`,
          )}
        >
          {message}
        </div>
      </CSSTransition>
    );

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
          {messageNode}
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

  private getField = () => {
    const { form, name } = this.props;
    const required = this.getRequired();
    if (form && name && required) {
      return form.getFields()[name];
    }
    return null;
  };

  private handleChange = (value: any) => {
    const rule = this.getRule();

    // for Checkbox & Radio
    if (value && value.target) {
      value = value.target.checked;
    }

    const isInvalid = Array.isArray(value) ? value.length === 0 : value === undefined;

    if (isInvalid) {
      this.setState({
        status: 'error',
        isInValid: true,
        message: rule.message,
        value,
      });
    } else {
      this.setState({
        status: 'default',
        isInValid: false,
        value,
      });
    }
  };

  private handleBlur = () => {
    const rule = this.getRule();
    const required = this.getRequired();
    const { value } = this.state;

    if (rule && rule.message && required && !value) {
      this.setState({
        message: rule.message,
        status: 'error',
        isInValid: true,
      });
    } else {
      this.setState({
        status: 'default',
        isInValid: false,
      });
    }
  };

  private checkInvalid = () => {
    const rule = this.getRule();
    const required = this.getRequired();
    const { name } = this.props;
    const { value } = this.state;
    if (required && !value) {
      warning(false, 'Form.Item.validator', `${name} is invalid.`);
      this.setState({
        message: rule.message,
        status: 'error',
        isInValid: true,
      });
      return {
        message: rule.message,
      };
    }
    return null;
  };

  private resetField = () => {
    this.setState({
      status: 'default',
      isInValid: false,
      value: null,
    });
  };
}

export default createConsumer(FormItem);
