import * as React from 'react';
import * as classNames from 'classnames';
import { IconProps } from './typings';

class Icon extends React.PureComponent<IconProps> {
  public static defaultProps = {
    prefixCls: 'dk-icon',
  };

  public render() {
    const { className, type, disabled, prefixCls, ...attributes } = this.props;
    const iconClassName = classNames(
      {
        [`${prefixCls}`]: true,
        [`${prefixCls}-${type}`]: true,
        [`${prefixCls}-disabled`]: disabled,
      },
      className,
    );
    return <i className={iconClassName} {...attributes} />;
  }
}

export default Icon;
