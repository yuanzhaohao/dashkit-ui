import * as classNames from 'classnames';
import * as React from 'react';
import { ViewportType, ColKeyType } from './types';

export type ColProps = {
  prefixCls?: string;
  className?: string;
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

function isInteger(value?: number | boolean) {
  return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
}

class Col extends React.PureComponent<ColProps> {
  static defaultProps = {
    prefixCls: 'dk-grid',
  };

  render() {
    const { props } = this;
    const { children, prefixCls, className, first, last, ...atributes } = this.props;


    const classMap: { [key: string]: string } = {
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
    const colKeysClassNames = Object.keys(props)
      .filter(key => classMap[key])
      .map((key: ColKeyType) => {
        delete atributes[key];
        if (isInteger(props[key])) {
          return (classMap[key] + '-' + props[key]);
        }
        return classMap[key]
      });

    const rowClassName = classNames(colKeysClassNames, {
      [`${prefixCls}-first-${first}`]: first !== undefined,
      [`${prefixCls}-last-${last}`]: last !== undefined,
    }, className);


    return (
      <div className={rowClassName} {...atributes}>{children}</div>
    );
  }
}

export default Col;