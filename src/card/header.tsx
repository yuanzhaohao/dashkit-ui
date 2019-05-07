import * as React from 'react';
import * as classNames from 'classnames';
import { HeaderProps } from './types';

class Header extends React.PureComponent<HeaderProps> {
  static defaultProps = {
    prefixCls: 'dk-card',
  };

  render() {
    const { className, prefixCls, children, title, ...attributes } = this.props;
    const cardClassName = classNames(
      `${prefixCls}-header`,
      className,
    );
    return (
      <div {...attributes} className={cardClassName}>
        {title ? <h4 className={`${prefixCls}-title`}>{title}</h4> : null}
        {children}
      </div>
    );
  }
}

export default Header;