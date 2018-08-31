import './style.scss';

import * as classNames from 'classnames';
import * as React from 'react';
import Icon from '../icon';

export type PaginationSize = 'small' | 'default' | 'large';
export type PaginationProps = {
  prefixCls?: string;
  current?: number;
  total?: number;
  size?: PaginationSize;
  pageSize?: number;
  range?: number;
  className?: string;
  onChange?: (value: number) => void;
};

class Pagination extends React.Component<PaginationProps> {
  public static defaultProps = {
    prefixCls: 'dashkit-pagination',
    current: 1,
    pageSize: 20,
    total: 0,
    range: 7,
    size: 'default' as PaginationSize,
  };
  public render() {
    const { className, prefixCls, size, current = 1 } = this.props;
    const paginationClassName = classNames([
      prefixCls,
      {
        [`${prefixCls}-large`]: size === 'large',
        [`${prefixCls}-small`]: size === 'small',
      },
      className,
    ]);
    const itemClassName = `${prefixCls}-item`;
    const { pages, max } = this.getPages();
    const items: React.ReactNodeArray = [];

    items.push(
      <li
        key="previous"
        onClick={
          current <= 1 ? null : this.handleChange.bind(this, current - 1)
        }
        className={classNames(itemClassName, [`${prefixCls}-prev`], {
          [`${prefixCls}-disabled`]: current === 1,
        })}
      >
        <span>
          <Icon type="chvron-left" />
        </span>
      </li>,
    );

    pages.forEach((page) => {
      if (page === '<..' || page === '..>') {
        items.push(
          <li
            key={page}
            className={classNames(itemClassName, `${prefixCls}-miss`)}
          >
            <span>
              <i />
              <i />
              <i />
            </span>
          </li>,
        );
      } else {
        items.push(
          <li
            key={page}
            onClick={
              current === page ? null : this.handleChange.bind(this, page)
            }
            className={classNames(itemClassName, {
              [`${prefixCls}-active`]: current === page,
            })}
          >
            <span>{page}</span>
          </li>,
        );
      }
    });

    items.push(
      <li
        key="next"
        onClick={
          current >= max ? null : this.handleChange.bind(this, current + 1)
        }
        className={classNames(itemClassName, [`${prefixCls}-next`], {
          [`${prefixCls}-disabled`]: current === max,
        })}
      >
        <span>
          <Icon type="chvron-right" />
        </span>
      </li>,
    );

    return <ul className={paginationClassName}>{items}</ul>;
  }

  private getPages = () => {
    const { pageSize = 20, total = 0, range = 7 } = this.props;
    const max = Math.ceil(total / pageSize);
    const pages = [];
    let { current = 1 } = this.props;
    let left;
    let right;

    if (current > max) {
      current = max;
    }

    left = current - Math.floor(range / 2) + 1;
    if (left < 1) {
      left = 1;
    }
    right = left + range - 2;
    if (right >= max) {
      right = max;
      left = right - range + 2;
      if (left < 1) {
        left = 1;
      }
    } else {
      right -= left > 1 ? 1 : 0;
    }

    if (left > 1) {
      pages.push(1);
    }
    if (left > 2) {
      pages.push('<..');
    }
    for (let i = left; i < right + 1; i++) {
      pages.push(i);
    }
    if (right < max - 1) {
      pages.push('..>');
    }
    if (right < max) {
      pages.push(max);
    }

    return { pages, max };
  }

  private handleChange = (value: number) => {
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }
}

export default Pagination;
