import './style.scss';

import Pagination, { PaginationProps } from '../pagination';
import * as classNames from 'classnames';
import { debounce } from 'lodash-es';
import * as React from 'react';

export type ColumnProps<T> = {
  title?: React.ReactNode;
  dataIndex: string;
  render?: (record: T, index: number, item: any) => React.ReactNode;
  className?: string;
  width?: number;
  fixed?: boolean;
};

export type TableProps<T extends object> = {
  prefixCls?: string;
  columns: Array<ColumnProps<T>>;
  dataSource?: T[];
  className?: string;
  fixed?: boolean;
  scroll?: {
    x?: number;
    y?: number;
  };
  pagination?: false | PaginationProps & {
    position?: 'top' | 'bottom';
  };
  title?: string;
  bodyClassName?: string;
};

export type TableState = {
  position?: 'left' | 'right' | 'both' | 'middle';
};

class TableList<T extends {[key: string]: any;}> extends React.Component<TableProps<T>, TableState> {
  static defaultProps = {
    prefixCls: 'dk-table',
  };

  lastScrollLeft: number;
  lastScrollTop: number;
  debouncedWindowResize: any;
  resizeEvent: any;
  readonly bodyRef: React.RefObject<HTMLDivElement>;
  readonly headRef: React.RefObject<HTMLDivElement>;

  constructor(props: TableProps<T>) {
    super(props);
    this.lastScrollLeft = 0;
    this.lastScrollTop = 0;
    this.bodyRef = React.createRef();
    this.headRef = React.createRef();
    this.state = {
      position: 'both',
    };
    this.debouncedWindowResize = debounce(this.handleWindowResize, 150);
  }

  componentDidMount() {
    this.handleWindowResize();
    this.resizeEvent = window.addEventListener(
      'resize',
      this.debouncedWindowResize,
    );
  }
  componentWillUnmount() {
    if (this.resizeEvent) {
      this.resizeEvent.remove();
    }
    if (this.debouncedWindowResize) {
      this.debouncedWindowResize.cancel();
    }
  }

  componentDidUpdate(prevProps: TableProps<T>) {
    if (
      this.props.fixed &&
      prevProps.dataSource !== this.props.dataSource &&
      this.bodyRef.current
    ) {
      this.handleWindowResize();
      this.bodyRef.current.scrollTo(0, 0);
    }
  }

  render() {
    const {
      prefixCls,
      columns,
      title,
      dataSource,
      className,
      fixed,
      scroll = {},
      pagination,
      bodyClassName,
    } = this.props;

    const headCell = (
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th className={column.className} key={index}>
              {column.title}
            </th>
          ))}
        </tr>
      </thead>
    );

    const bodyCell = dataSource && dataSource.length > 0 && (
      <tbody>
        {dataSource.map((itemData, index) => (
          <tr key={index}>
            {columns.map((column, key) => (
              <td className={column.className} key={key}>
                {column.render
                  ? column.render(itemData, index, itemData[column.dataIndex])
                  : column.dataIndex && itemData[column.dataIndex] !== undefined
                    ? String(itemData[column.dataIndex])
                    : null}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );

    const { position: paginationPosition = 'bottom', ...otherPaginationProps } = pagination || {};
    const paginationCell = (
      <div className={`${prefixCls}-table-page`}>
        <Pagination {...otherPaginationProps} />
      </div>
    );

    const colgroupCell = (
      <colgroup>
        {columns.map((c, index) => (
          <col
            key={index}
            style={{
              width: c.width,
              minWidth: c.width,
            }}
          />
        ))}
      </colgroup>
    );

    const { position } = this.state;
    const tableClassName = classNames(
      {
        [`${prefixCls}`]: true,
        [`${prefixCls}-scroll`]: fixed,
        [`${prefixCls}-position-left`]: position === 'left',
        [`${prefixCls}-position-right`]: position === 'right',
        [`${prefixCls}-position-middle`]: position === 'middle',
        [`${prefixCls}-position-both`]: position === 'both',
      },
      className,
    );

    const bodyStyle: React.CSSProperties = {};
    const tableStyle: React.CSSProperties = {};

    if (fixed && scroll.x) {
      bodyStyle.overflowX = 'scroll';
      bodyStyle.WebkitTransform = 'translate3d (0, 0, 0)';
      tableStyle.width = scroll.x;
      tableStyle.tableLayout = 'fixed';
    }

    if (fixed && scroll.y) {
      bodyStyle.overflowY = 'scroll';
      bodyStyle.maxHeight = scroll.y;
    }

    return (
      <>
        {pagination && paginationPosition === 'top' ? paginationCell : null}
        <div className={tableClassName}>
          {title && <div className={`${prefixCls}-title`}>{title}</div>}
          <div
            className={`${prefixCls}-header`}
            ref={this.headRef}
            onScroll={this.handleBodyScrollLeft}
          >
            <table style={tableStyle}>
              {colgroupCell}
              {headCell}
            </table>
          </div>
          <div
            className={classNames(`${prefixCls}-body`, bodyClassName)}
            ref={this.bodyRef}
            style={bodyStyle}
            onScroll={this.handleBodyScrollLeft}
          >
            {dataSource && dataSource.length ? (
              <table style={tableStyle}>
                {colgroupCell}
                {bodyCell}
              </table>
            ) : (
                <div
                  style={tableStyle}
                  className={`${prefixCls}-no-data`}
                >
                  No data
              </div>
              )}
          </div>
          {fixed && (
            <>
              <div className={`${prefixCls}-fixed-left`} />
              <div className={`${prefixCls}-fixed-right`} />
            </>
          )}
        </div>
        {pagination && paginationPosition === 'bottom' ? paginationCell : null}
      </>
    );
  }

  handleBodyScrollLeft = (e: React.FormEvent<EventTarget>) => {
    if (e.currentTarget !== e.target) {
      return;
    }
    const target = e.target as HTMLDivElement;
    const { scroll = {} } = this.props;
    const headTable = this.headRef.current;
    const bodyTable = this.bodyRef.current;
    if (target.scrollLeft !== this.lastScrollLeft && scroll.x) {
      if (target === bodyTable && headTable) {
        headTable.scrollLeft = target.scrollLeft;
      } else if (target === headTable && bodyTable) {
        bodyTable.scrollLeft = target.scrollLeft;
      }
      this.setScrollPositionClassName();
    }
    this.lastScrollLeft = target.scrollLeft;
  }

  setScrollPositionClassName() {
    const bodyTable = this.bodyRef.current;

    if (bodyTable) {
      const { position } = this.state;
      const scrollToLeft = bodyTable.scrollLeft === 0;
      const scrollToRight =
        bodyTable.scrollLeft + 1 >=
        bodyTable.children[0].getBoundingClientRect().width -
        bodyTable.getBoundingClientRect().width;
      if (scrollToLeft && scrollToRight) {
        this.setState({
          position: 'both',
        });
      } else if (scrollToLeft) {
        this.setState({
          position: 'left',
        });
      } else if (scrollToRight) {
        this.setState({
          position: 'right',
        });
      } else if (position !== 'middle') {
        this.setState({
          position: 'middle',
        });
      }
    }
  }

  handleWindowResize = () => {
    this.setScrollPositionClassName();
  }
}

export default TableList;
