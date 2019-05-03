import * as React from 'react';
import * as classNames from 'classnames';
import { SelectOptionGroupProps } from './types';

const OptionGroup = (props: Partial<SelectOptionGroupProps>) => {
  const { prefixCls = 'dk-select', className, label, children, ...attributes } = props;
  const groupClassName = classNames({
    [`${prefixCls}-group`]: true,
  }, className);
  return (
    <div
      className={groupClassName}
      {...attributes}
    >
      <div className={`${prefixCls}-group-title`}>{label}</div>
      <div className={`${prefixCls}-group-list`}>{children}</div>
    </div>
  );
};

export default OptionGroup;
