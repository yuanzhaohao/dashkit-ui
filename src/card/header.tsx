import * as React from 'react';
import * as classNames from 'classnames';
import { HeaderProps } from './types';
import { createConsumer } from './context';
import Icon from '../icon';

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
      collapse,
      visible,
      ...attributes
    } = this.props;
    const cardClassName = classNames({
      [`${prefixCls}-header`]: true,
      [`${prefixCls}-header-collapse`]: collapse,
      [`${prefixCls}-header-collapse-visible`]: visible,
    }, className);
    return (
      <div {...attributes} className={cardClassName} onClick={this.handleClick}>
        {collapse
          ? <Icon
              type="chevron-right"
              className={classNames(`${prefixCls}-header-icon`, {
                [`${prefixCls}-header-icon-visible`]: visible,
              })}
            />
          : null
        }
        {children}
      </div>
    );
  }

  handleClick = () => {
    const { handleHeaderClick, onClick, collapse } = this.props;

    if (collapse && typeof handleHeaderClick === 'function') {
      handleHeaderClick();
    }

    if (typeof onClick === 'function') {
      onClick();
    }
  }
}

export default createConsumer(Header);