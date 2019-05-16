import * as classNames from 'classnames';
import * as React from 'react';
import { CollapseProps, CollapseState, CardProps } from './typings';
import Card from './card';

class Collapse extends React.PureComponent<CollapseProps, CollapseState> {
  constructor(props: CollapseProps) {
    super(props);
    this.state = {
      activeIndexs: props.activeIndexs || props.defaultActiveIndexs || [],
    };
  }
  public render() {
    const {
      className,
      children,
      defaultActiveIndexs,
      activeIndexs: activeIndexsProp,
      ...attributes
    } = this.props;
    const collapseClassName = classNames('dk-card-collapse', className);
    const { activeIndexs } = this.state;
    const newChildren = React.Children.map(children, (child: React.ReactElement<CardProps>) => {
      if (!child) {
        return null;
      }
      const { index } = child.props;
      const newProps = {
        ...child.props,
        collapse: true,
        visible: activeIndexs.indexOf(index) !== -1,
        onCollapse: this.handleCollapse.bind(this, index),
      };
      return <Card {...newProps} />;
    });
    return (
      <div {...attributes} className={collapseClassName}>
        {newChildren}
      </div>
    );
  }

  public handleCollapse = (index: string | number) => {
    const { activeIndexs } = this.state;
    const newActiveIndexs =
      activeIndexs.indexOf(index) === -1
        ? Array.from(new Set([...activeIndexs, index]))
        : activeIndexs.filter(i => i !== index);

    this.setState({
      activeIndexs: newActiveIndexs,
    });
  };
}

export default Collapse;
