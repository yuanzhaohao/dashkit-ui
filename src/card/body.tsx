import * as classNames from 'classnames';
import * as React from 'react';
import { CSSTransition } from 'react-transition-group';
import { BodyProps } from './types';
import { removeClass } from '../utils/dom';
import { createConsumer } from './context';

class Body extends React.PureComponent<BodyProps> {
  render() {
    const {
      className,
      collapse,
      handleHeaderClick,
      prefixCls = 'dk-card',
      visible,
      ...attributes
    } = this.props;
    const basicClassName = classNames({
      [`${prefixCls}-body`]: true,
    }, className);
    const collapseClassName = classNames({
      [`${prefixCls}-body-collapse`]: true,
      [`${prefixCls}-body-collapse-visible`]: visible,
    })
    const bodyNode = <div {...attributes} className={basicClassName} />;
    return (collapse
      ? <CSSTransition
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
      : bodyNode
    );
  }

  handleEnter = (el) => {
    const { prefixCls } = this.props;
    removeClass(el, `${prefixCls}-body-collapse-visible`);
    if (el.scrollHeight !== 0) {
      el.style.height = el.scrollHeight + 'px';
    }
  }

  handleEntered = (el) => {
    el.style.height = '';
  }

  handleExit = (el) => {
    el.style.height = el.scrollHeight + 'px';
  }

  handleExiting = (el) => {
    if (el.scrollHeight !== 0) {
      el.style.height = '0';
    }
  }
}

export default createConsumer(Body);