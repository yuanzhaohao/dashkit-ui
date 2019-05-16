import * as classNames from 'classnames';
import * as React from 'react';
import { CSSTransition } from 'react-transition-group';
import { BodyProps } from './types';
import { createConsumer } from './context';

class Body extends React.PureComponent<BodyProps> {
  public render() {
    const {
      className,
      collapse,
      handleHeaderClick,
      prefixCls = 'dk-card',
      visible,
      ...attributes
    } = this.props;
    const basicClassName = classNames(
      {
        [`${prefixCls}-body`]: true,
      },
      className,
    );
    const collapseClassName = classNames({
      [`${prefixCls}-body-collapse`]: true,
      [`${prefixCls}-body-collapse-visible`]: visible,
    });
    const bodyNode = <div {...attributes} className={basicClassName} />;
    return collapse ? (
      <CSSTransition
        in={visible}
        timeout={350}
        onEnter={this.handleEnter}
        onEntered={this.handleEntered}
        onExit={this.handleExit}
        onExiting={this.handleExiting}
        classNames={`${prefixCls}-body-collapse`}
      >
        <div className={collapseClassName}>{bodyNode}</div>
      </CSSTransition>
    ) : (
      bodyNode
    );
  }

  public handleEnter = el => {
    if (el.scrollHeight !== 0) {
      el.style.height = el.scrollHeight + 'px';
    }
  };

  public handleEntered = el => {
    el.style.height = '';
  };

  public handleExit = el => {
    el.style.height = el.scrollHeight + 'px';
  };

  public handleExiting = el => {
    if (el.scrollHeight !== 0) {
      el.style.height = '0';
    }
  };
}

export default createConsumer(Body);
