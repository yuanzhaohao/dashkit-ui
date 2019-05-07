import * as React from 'react';
import * as classNames from 'classnames';
import { HeaderProps } from './types';
import { createConsumer } from './context';

class Header extends React.PureComponent<HeaderProps> {
  static defaultProps = {
    prefixCls: 'dk-card',
  };

  render() {
    const {
      className,
      prefixCls,
      children,
      title,
      handleHeaderClick,
      key,
      collapse,
      visible,
      ...attributes
    } = this.props;
    const cardClassName = classNames({
      [`${prefixCls}-header`]: true,
      [`${prefixCls}-header-collapse`]: collapse,
    }, className);
    return (
      <div {...attributes} className={cardClassName} onClick={this.handleClick.bind(this, key)}>
        {title ? <h4 className={`${prefixCls}-title`}>{title}</h4> : null}
        {children}
      </div>
    );
  }

  handleClick = (key?: string | number) => {
    const { handleHeaderClick, onClick, collapse } = this.props;

    if (collapse && typeof handleHeaderClick === 'function') {
      handleHeaderClick(key);
    }

    if (typeof onClick === 'function') {
      onClick();
    }
  }
}

export default createConsumer(Header);