import * as classNames from 'classnames';
import * as React from 'react';
import Accordion from './accordion';
import Collapse from './collapse';
import Header from './header';
import Footer from './footer';
import Body from './body';
import { CardProps, CardState } from './typings';
import { Provider } from './context';

class Card extends React.PureComponent<CardProps, CardState> {
  public static Header: typeof Header;
  public static Footer: typeof Footer;
  public static Body: typeof Body;
  public static Accordion: typeof Accordion;
  public static Collapse: typeof Collapse;
  public static defaultProps = {
    prefixCls: 'dk-card',
    // visible: true,
  };

  public static getDerivedStateFromProps(nextProps: CardProps) {
    if ('visible' in nextProps) {
      return {
        visible: nextProps.visible,
      };
    }
    return null;
  }

  constructor(props: CardProps) {
    super(props);
    this.state = {
      visible: !!props.visible,
    };
  }

  public render() {
    const {
      className,
      prefixCls,
      children,
      collapse,
      visible: visibleProp,
      onCollapse,
      ...attributes
    } = this.props;
    const { visible } = this.state;
    const cardClassName = classNames(prefixCls, className);
    return (
      <div {...attributes} className={cardClassName}>
        <Provider
          value={{
            visible,
            collapse,
            handleHeaderClick: this.handleHeaderClick,
          }}
        >
          {children}
        </Provider>
      </div>
    );
  }

  public handleHeaderClick = () => {
    const { visible } = this.state;
    const { index, onCollapse } = this.props;
    if (typeof onCollapse === 'function') {
      onCollapse(index);
      return;
    }
    this.setState({
      visible: !visible,
    });
  };
}

export default Card;
