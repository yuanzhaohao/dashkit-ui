import './style.scss';

import * as React from 'react';
import Tooltip, { TooltipProps } from '../tooltip';

export type PopoverProps = TooltipProps & {
  title: React.ReactNode;
  content: React.ReactNode;
}

class Popover extends React.PureComponent<PopoverProps> {
  static defaultProps = {
    prefixCls: 'dk-popover',
    placement: 'top',
    trigger: 'click',
  };

  render() {
    const { content, prefixCls, title, ...attibutes } = this.props;
    const realContent = <>
      <div className={`${prefixCls}-title`}>{title}</div>
      <div className={`${prefixCls}-content`}>{content}</div>
    </>;
    return (
      <Tooltip {...attibutes} prefixCls={prefixCls} content={realContent} />
    );
  }
}

export default Popover;
