import * as classNames from 'classnames';
import * as React from 'react';
import { ViewportType } from './types';

export type ColProps = {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  xs?: number | boolean;
  sm?: number | boolean;
  md?: number | boolean;
  lg?: number | boolean;
  xl?: number | boolean;
  xsOffset?: number;
  smOffset?: number;
  mdOffset?: number;
  lgOffset?: number;
  xlOffset?: number;
  first?: ViewportType;
  last?: ViewportType;
};

function isInteger(value) {
  return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
}

class Col extends React.PureComponent<ColProps> {
  static defaultProps = {
    prefixCls: 'dk-grid',
  };

  render() {
    const {
      children,
      prefixCls,
      style,
      className,
      first,
      last,
    } = this.props;
    const colKeysClassNames = this.getColClassNames();
    const rowClassName = classNames(colKeysClassNames, {
      [`${prefixCls}-first-${first}`]: first !== undefined,
      [`${prefixCls}-last-${last}`]: last !== undefined,
    }, className);

    return (
      <div
        style={style}
        className={rowClassName}
      >{children}</div>
    );
  }

  getColClassNames = () => {
    const { props } = this;
    const { prefixCls } = props;
    const classMap = {
      xs: `${prefixCls}-col-xs`,
      sm: `${prefixCls}-col-sm`,
      md: `${prefixCls}-col-md`,
      lg: `${prefixCls}-col-lg`,
      xl: `${prefixCls}-col-xl`,
      xsOffset: `${prefixCls}-col-xs-offset`,
      smOffset: `${prefixCls}-col-sm-offset`,
      mdOffset: `${prefixCls}-col-md-offset`,
      lgOffset: `${prefixCls}-col-lg-offset`,
      xlOffset: `${prefixCls}-col-xl-offset`,
    };

    return Object.keys(props)
      .filter(key => classMap[key])
      .map(key => isInteger(props[key])
        ? (classMap[key] + '-' + props[key])
        : classMap[key]
      );
  }
}

export default Col;