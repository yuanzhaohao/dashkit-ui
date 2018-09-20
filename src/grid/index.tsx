import './style.scss';
import * as classNames from 'classnames';
import * as React from 'react';
import Row from './row';
import Col from './col';

export type GridProps = {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  fluid?: boolean;
};

class Grid extends React.PureComponent<GridProps> {
  static Row: React.ReactNode;
  static Col: React.ReactNode;
  static defaultProps = {
    prefixCls: 'dk-grid',
    fluid: false,
  };

  render() {
    const {
      children,
      prefixCls,
      style,
      fluid,
      className,
      ...attibutes
    } = this.props;
    const gridClassName = classNames(prefixCls, {
      [`${prefixCls}-fluid`]: fluid,
    }, className);

    return (
      <div
        style={style}
        className={gridClassName}
        {...attibutes}
      >{children}</div>
    );
  }
}

Grid.Row = Row;
Grid.Col = Col;


export default Grid;