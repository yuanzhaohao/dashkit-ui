import './style.scss';

import * as classNames from 'classnames';
import * as React from 'react';
import Accordion from './accordion';
import { CardProps, BasicProps, HeaderProps } from './types';

class Card extends React.PureComponent<CardProps> {
  static Header: typeof Header;
  static Footer: typeof Footer;
  static Body: typeof Body;
  static Accordion: typeof Accordion;
  static defaultProps = {
    prefixCls: 'dk-card',
  };

  render() {
    const { className, prefixCls, children, title, ...attributes } = this.props;
    const cardClassName = classNames(
      prefixCls,
      className,
    );
    return (
      <div {...attributes} className={cardClassName}>
        {title ? <h3 className={`${prefixCls}-title`}>{title}</h3> : null}
        {children}
      </div>
    );
  }
}

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

function generator(cls: string) {
  return class Basic extends React.Component<BasicProps> {
    static defaultProps = {
      prefixCls: 'dk-card',
    };
    render() {
      const { className, prefixCls, children, ...attributes } = this.props;
      const basicClassName = classNames(`${prefixCls}-${cls}`, className);
      return (
        <div {...attributes} className={basicClassName}>{children}</div>
      );
    }
  }
}

const Footer = generator('footer');
const Body = generator('body');

Card.Header = Header;
Card.Footer = Footer;
Card.Body = Body;
Card.Accordion = Accordion;

export default Card;
