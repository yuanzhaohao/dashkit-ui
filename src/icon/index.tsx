import './style.scss';

import * as classNames from 'classnames';
import * as React from 'react';

export type IconProps = {
  prefixCls?: string;
  type: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<any>;
};

class Icon extends React.PureComponent<IconProps> {
  static defaultProps = {
    prefixCls: 'dk-icon',
  };
  render() {
    const { className, type, prefixCls, style } = this.props;
    const iconClassName = classNames(
      {
        [`${prefixCls}`]: true,
        [`${prefixCls}-${type}`]: true,
      },
      className,
    )
    return <i className={iconClassName} style={style} />;
  }
}

export default Icon;
