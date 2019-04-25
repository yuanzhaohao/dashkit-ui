import './style.scss';

import * as classNames from 'classnames';
import * as React from 'react';

export type SelectSize = 'small' | 'default' | 'large';
export type SelectProps = {
  className?: string;
  prefixCls?: string;
  size: SelectSize;
};

class Select extends React.Component<SelectProps> {
  static defaultProps = {
    prefixCls: 'dk-select',
    size: 'default' as SelectSize,
  };

  render() {
    const {
      className,
      prefixCls,
      size,
      children,
      ...attributes
    } = this.props;
    const selectClassName = classNames(
      prefixCls,
      {
        [`${prefixCls}-large`]: size === 'large',
        [`${prefixCls}-small`]: size === 'small',
      },
      className,
    );
    return (
      <div {...attributes} className={selectClassName}>
        {children}
      </div>
    );
  }
}

export default Select;
