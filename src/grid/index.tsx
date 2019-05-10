import './style.scss';
import * as classNames from 'classnames';
import * as React from 'react';
import Row from './row';
import Col from './col';

export type GridProps = {
  prefixCls?: string;
  className?: string;
  fluid?: boolean;
};

class Grid extends React.PureComponent<GridProps> {
  public static Row: any;
  public static Col: any;
  public static defaultProps = {
    prefixCls: 'dk-grid',
    fluid: false,
  };

  public render() {
    const { children, prefixCls, fluid, className, ...attributes } = this.props;
    const gridClassName = classNames(
      prefixCls,
      {
        [`${prefixCls}-fluid`]: fluid,
      },
      className,
    );

    return (
      <div className={gridClassName} {...attributes}>
        {children}
      </div>
    );
  }
}

Grid.Row = Row;
Grid.Col = Col;

export default Grid;
