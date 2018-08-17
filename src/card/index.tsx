import './style.scss';

import * as classNames from 'classnames';
import * as React from 'react';

export type CardProps = {
  className?: string;
  title?: string;
};

export type HeaderProps = {
  className?: string;
  title?: string;
};

export type BasicProps = {
  className?: string;
};
class Card extends React.PureComponent<CardProps> {
  static Header: any;
  static Footer: any;
  static Body: any;
  render() {
    const { className, children, title, ...attributes } = this.props;
    const cardClassName = classNames(
      'dashkit-card',
      className,
    );
    return (
      <div {...attributes} className={cardClassName}>
        {title ? <h3 className="dashkit-card-title">{title}</h3> : null}
        {children}
      </div>
    );
  }
}

class CardHeader extends React.PureComponent<CardProps> {
  render() {
    const { className, children, title, ...attributes } = this.props;
    const cardClassName = classNames(
      'dashkit-card-header',
      className,
    );
    return (
      <div {...attributes} className={cardClassName}>
        {title ? <h4 className="dashkit-card-title">{title}</h4> : null}
        {children}
      </div>
    );
  }
}

function generator(classname: string) {
  return class Basic extends React.Component<BasicProps> {
    render() {
      const { className, children, ...attributes } = this.props;
      const basicClassName = classNames(classname, className);
      return (
        <div {...attributes} className={basicClassName}>{children}</div>
      );
    }
  }
}

const Footer = generator('dashkit-card-footer');
const Body = generator('dashkit-card-body');

Card.Header = CardHeader;
Card.Footer = Footer;
Card.Body = Body;

export default Card;
