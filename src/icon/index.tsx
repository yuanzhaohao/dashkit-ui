import './style.scss';

import * as React from 'react';
import * as classNames from 'classnames';
import { default as types } from './types';

export type IconProps = {
  prefixCls?: string;
  type: string;
  className?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
};

class Icon extends React.PureComponent<IconProps> {
  static defaultProps = {
    prefixCls: 'dk-icon',
  };

  static types = types;

  render() {
    const { className, type, disabled, prefixCls, ...attributes } = this.props;
    const iconClassName = classNames({
      [`${prefixCls}`]: true,
      [`${prefixCls}-${type}`]: true,
      [`${prefixCls}-disabled`]: disabled,
    }, className);
    return <i className={iconClassName} {...attributes} />;
  }
}

export default Icon;
