import * as classNames from 'classnames';
import * as React from 'react';
import { CollapseProps, CollapseState } from './types';

class Collapse extends React.PureComponent<CollapseProps, CollapseState> {
  constructor(props: CollapseProps) {
    super(props);
    this.state = {
      activeKey: [],
    };
  }
  render() {
    const { className, children, ...attributes } = this.props;
    const collapseClassName = classNames(
      'dk-card-collapse',
      className,
    );
    return (
      <div {...attributes} className={collapseClassName}>
        {children}
      </div>
    );
  }
}

export default Collapse;