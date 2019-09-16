import * as React from 'react';
import * as classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import { createConsumer } from './context';
import { ContextProps, FormItemProps, FormItemState, FormItemStatus } from './typings';
import warning from '../utils/warning';
import { COMPONENT_TYPE, DEFAULT_TRIGGER } from './constants';

class FormItem extends React.Component<Partial<ContextProps>, Partial<FormItemState>> {
  public static defaultProps = {
    prefixCls: 'dk-form',
    theme: 'default' as FormItemStatus,
  };

  constructor(props: FormItemProps) {
    super(props);
    this.state = {
      status: 'default',
      value: undefined,
      message: props.rule && props.rule.message ? props.rule.message : '',
      isInvalid: false,
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
      labelClassName,
      name,
      label,
      rule,
      form,
      status: statusProp,
      ...attributes
    } = this.props;
    const { message, isInvalid } = this.state;
    const required = this.getRequired();

    const itemClassName = classNames(
      {
        [`${prefixCls}-item`]: true,
        [`${prefixCls}-item-top`]: labelAlign === 'top',
        [`${prefixCls}-item-required`]: this.getRequired(),
      },
      className,
    );
    const labelClsName = classNames(
      {
        [`${prefixCls}-item-label`]: true,
        [`${prefixCls}-item-label-required`]: required,
        [`${prefixCls}-item-label-${labelAlign}`]: true,
      },
      labelClassName,
    );

    const newChildren = this.getChildren();

    const messageNode = (
      <CSSTransition
        in={!!(message && isInvalid)}
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
          className={labelClsName}
          style={{
            width: labelWidth,
          }}
        >
          {label}
        </div>
        <div className={`${prefixCls}-item-control`}>
          {newChildren}
          {messageNode}
        </div>
      </div>
    );
  }

  private getChildren = () => {
    const realRule = this.getRule();
    const { children } = this.props;
    const { value, status } = this.state;

    return React.Children.map(children, (child: any) => {
      const { componentType } = child.type;
      if (COMPONENT_TYPE[componentType]) {
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

        if (
          [COMPONENT_TYPE.Input, COMPONENT_TYPE.Select, COMPONENT_TYPE.Calendar].indexOf(
            componentType,
          ) !== -1
        ) {
          if (trigger.indexOf('blur') !== -1) {
            newProps.onBlur = (...args) => {
              this.handleBlurAndFocus();
              if (child.props.onBlur) {
                child.props.onBlur(...args);
              }
            };
          }

          if (trigger.indexOf('focus') !== -1) {
            newProps.onFocus = (...args) => {
              this.handleBlurAndFocus();
              if (child.props.onFocus) {
                child.props.onFocus(...args);
              }
            };
          }
        }

        if (
          [
            COMPONENT_TYPE.CheckboxGroup,
            COMPONENT_TYPE.RadioGroup,
            COMPONENT_TYPE.Input,
            COMPONENT_TYPE.Select,
            COMPONENT_TYPE.Calendar,
          ].indexOf(componentType) !== -1
        ) {
          newProps.value = value;
        }

        if (
          [COMPONENT_TYPE.Switch, COMPONENT_TYPE.Checkbox, COMPONENT_TYPE.Radio].indexOf(
            componentType,
          ) !== -1
        ) {
          newProps.checked = !!value;
        }

        return React.cloneElement(child, newProps);
      }
      return child;
    });
  };

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
    const rule = this.getRule();
    const required = this.getRequired();

    // for Checkbox & Radio
    if (value && value.target) {
      value = value.target.checked;
    }

    const isInvalid = Array.isArray(value)
      ? value.length === 0
      : value === undefined || value === '';
    const newState: Partial<FormItemState> = {
      isInvalid,
      value,
    };

    if (required) {
      newState.message = rule.message;
      newState.status = isInvalid ? 'error' : 'default';
    } else {
      newState.status = 'default';
    }

    this.setState(newState);
    this.handleValidator(value);
  };

  private handleBlurAndFocus = () => {
    const rule = this.getRule();
    const required = this.getRequired();
    const { value } = this.state;

    if (rule && rule.message && required && !value) {
      this.setState({
        message: rule.message,
        status: 'error',
        isInvalid: true,
      });
    } else {
      this.setState({
        status: 'default',
        isInvalid: false,
      });
    }
    this.handleValidator(value);
  };

  private handleValidator = (value: any) => {
    const { form } = this.props;
    const rule = this.getRule();
    const required = this.getRequired();
    if (typeof rule.validator === 'function') {
      const values = form.getFieldsValues();
      let validatorMessage;
      rule.validator(values, value, (message: string) => {
        if (message && required) {
          this.setState({
            message,
            isInvalid: true,
            status: 'error',
          });
          validatorMessage = message;
        }
      });
      return validatorMessage;
    }
  };

  private checkInvalid = () => {
    const rule = this.getRule();
    const required = this.getRequired();
    const { name } = this.props;
    const { value } = this.state;
    const isInvalid = Array.isArray(value)
      ? value.length === 0
      : value === undefined || value === '';
    if (required) {
      const result = [];
      if (isInvalid) {
        warning(false, 'Form.Item.validator', `${name} is invalid.`);
        this.setState({
          message: rule.message,
          status: 'error',
          isInvalid: true,
        });
        result.push(rule.message);
      }

      const message = this.handleValidator(value);
      if (message) {
        result.push(message);
      }

      if (result.length > 0) {
        return {
          message: result,
          name,
        };
      }
    }
    return null;
  };

  private resetField = () => {
    this.setState({
      status: 'default',
      isInvalid: false,
      value: undefined,
    });
  };
}

export default createConsumer(FormItem);
