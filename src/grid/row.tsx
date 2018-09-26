import * as React from 'react';
import * as classNames from 'classnames';
import { ViewportType, RowKeyType } from './types';

export type RowProps = {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  reverse?: boolean;
  start?: ViewportType;
  center?: ViewportType,
  end?: ViewportType,
  top?: ViewportType,
  middle?: ViewportType,
  bottom?: ViewportType,
  around?: ViewportType,
  between?: ViewportType,
};

const rowKeys: RowKeyType[] = ['start', 'center', 'end', 'top', 'middle', 'bottom', 'around', 'between'];

class Row extends React.PureComponent<RowProps> {
  static defaultProps = {
    prefixCls: 'dk-grid',
    reverse: false,
  };

  render() {
    const { children, prefixCls, className, reverse, ...attributes } = this.props;
    const rowKeysClassNames = this.getRowClassNames();
    const rowClassName = classNames(`${prefixCls}-row`, rowKeysClassNames, {
      [`${prefixCls}-row-reverse`]: reverse,
    }, className);

    rowKeys.forEach(key => {
      delete attributes[key];
    });
    return (
      <div className={rowClassName} {...attributes}>{children}</div>
    );
  }

  getRowClassNames = () => {
    const { prefixCls } = this.props;

    return rowKeys.map((key: RowKeyType) => {
      const value = this.props[key];
      if (!!value) {
        return {
          [`${prefixCls}-${key}-${value}`]: true,
        }
      }
      return null;
    });
  }
}

export default Row;