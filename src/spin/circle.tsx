import * as React from 'react';
import * as classNames from 'classnames';
import { SpinCircleProps } from './typings';

const SpinCircle = (props: SpinCircleProps) => {
  const { prefixCls = 'dk-spin', size } = props;
  return (
    <div
      className={classNames(
        [
          `${prefixCls}-circle`,
          {
            [`${prefixCls}-large`]: size === 'large',
            [`${prefixCls}-small`]: size === 'small',
          },
        ],
        props.className,
      )}
    />
  );
};

export default SpinCircle;
