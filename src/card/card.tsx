import * as classNames from 'classnames';
import * as React from 'react';
import Accordion from './accordion';
import Collapse from './collapse';
import Header from './header';
import Footer from './footer';
import Body from './body';
import { CardProps, CardState } from './types';
import { Provider } from './context';

class Card extends React.PureComponent<CardProps, CardState> {
  static Header: typeof Header;
  static Footer: typeof Footer;
  static Body: typeof Body;
  static Accordion: typeof Accordion;
  static Collapse: typeof Collapse;
  static defaultProps = {
    prefixCls: 'dk-card',
  };

  constructor(props: CardProps) {
    super(props);
    this.state = {
      visible: true,
    };
  }

  render() {
    const {
      className,
      prefixCls,
      children,
      collapse,
      ...attributes
    } = this.props;
    const { visible } = this.state;
    const cardClassName = classNames(
      prefixCls,
      className,
    );
    return (
      <div {...attributes} className={cardClassName}>
        <Provider
          value={{
            visible,
            collapse,
            handleHeaderClick: this.handleHeaderClick
          }}
        >{children}</Provider>
      </div>
    );
  }

  handleHeaderClick = (key?: string | number) => {
    const { visible } = this.state;
    this.setState({
      visible: !visible,
    });
  }
}

export default Card;
