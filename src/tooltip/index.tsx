import './style.scss';
import * as React from 'react';
import * as classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';

export type TooltipTheme = 'dark' | 'light';
export type TooltipPlacement = 'top' | 'left' | 'right' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';

export type TooltipProps = {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  theme: TooltipTheme;
  content: string;
  placement: TooltipPlacement;
};

export type TooltipState = {
  active: boolean;
};

class Tooltip extends React.PureComponent<TooltipProps, TooltipState> {
  static defaultProps = {
    prefixCls: 'dk-tooltip',
    disabled: false,
    theme: 'dark' as TooltipTheme,
    placement: 'top' as TooltipPlacement,
  };
  render() {
    const { children, prefixCls, disabled, content } = this.props;
    return <>
      {children}
      {!disabled && (
        // <CSSTransition
        //   in={true}
        //   timeout={350}
        //   classNames={`${prefixCls}`}
        // >
          <div className={prefixCls}>
            <div className={`${prefixCls}-arrow`}></div>
            <div className={`${prefixCls}-inner`}>{content}</div>
          </div>
        // </CSSTransition>
      )}
    </>;
  }
}

export default Tooltip;