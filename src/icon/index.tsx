import './style.scss';

import * as React from 'react';
import * as classNames from 'classnames';

export type IconProps = {
  prefixCls?: string;
  type: string;
  className?: string;
};

class Icon extends React.PureComponent<IconProps> {
  static defaultProps = {
    prefixCls: 'dk-icon',
  };

  render() {
    const { className, type, prefixCls, ...attributes } = this.props;
    const iconClassName = classNames({
      [`${prefixCls}`]: true,
      [`${prefixCls}-${type}`]: true,
    }, className);
    return <i className={iconClassName} {...attributes} />;
  }
}

export default Icon;
