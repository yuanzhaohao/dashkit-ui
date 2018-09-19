import './style.scss';
import * as classNames from 'classnames';
import * as React from 'react';

const rowKeys = ['start', 'center', 'end', 'top', 'middle', 'bottom', 'around', 'between'];
export type GridViewportType = 'xs' | 'sm' | 'md' | 'lg';

export type GridProps = {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  reverse?: boolean;
  start?: GridViewportType;
  center?: GridViewportType,
  end?: GridViewportType,
  top?: GridViewportType,
  middle?: GridViewportType,
  bottom?: GridViewportType,
  around?: GridViewportType,
  between?: GridViewportType,
};

class Grid extends React.Component<GridProps> {
  static defaultProps = {
    prefixCls: 'dk-grid',
    reverse: false,
  };

  render() {
    const {
      children,
      prefixCls,
      style,
      reverse,
      className,
      ...attibutes
    } = this.props;
    const rowClassName = classNames({
      [`${prefixCls}-row`]: true,
      [`${prefixCls}-reverse`]: reverse,
    }, className);

    return (
      <div
        style={style}
        className={rowClassName}
        {...attibutes}
      >{children}</div>
    );
  }
}

export default Grid;