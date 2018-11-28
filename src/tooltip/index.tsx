import './style.scss';
import * as React from 'react';
import * as classNames from 'classnames';

export type TooltipProps = {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
};

export type TooltipState = {
  activeIndex?: string;
  openedMenus: string[];
};

class Tooltip extends React.PureComponent<TooltipProps, TooltipState> {
  render() {
    const { children, prefixCls } = this.props;
    return (
      <div className={prefixCls}>{children}</div>
    );
  }
}

export default Tooltip;