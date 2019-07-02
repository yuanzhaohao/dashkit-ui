import * as React from 'react';
import Tooltip, { TooltipProps } from '../tooltip';

export type PopoverProps = TooltipProps & {
  title: React.ReactNode;
  content: React.ReactNode;
};

const Popover = (props: PopoverProps) => {
  const { content, prefixCls = 'dk-popover', trigger, title, visible, ...attibutes } = props;
  const realContent = (
    <>
      <div className={`${prefixCls}-title`}>{title}</div>
      <div className={`${prefixCls}-content`}>{content}</div>
    </>
  );
  return <Tooltip {...attibutes} trigger={trigger} prefixCls={prefixCls} content={realContent} />;
};

export default Popover;
