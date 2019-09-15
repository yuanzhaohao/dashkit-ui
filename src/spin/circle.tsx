import * as React from 'react';
import * as classNames from 'classnames';
import { SpinCircleProps } from './typings';

const SpinCircle = (props: SpinCircleProps) => {
  const { prefixCls, size } = props;
  return (
    <div
      className={classNames([
        `${prefixCls}-circle`,
        {
          [`${prefixCls}-large`]: size === 'large',
          [`${prefixCls}-small`]: size === 'small',
        },
      ])}
    />
  );
};

export default SpinCircle;
