import * as classNames from 'classnames';
import * as React from 'react';
import { AccordionProps } from './typings';

class Accordion extends React.PureComponent<AccordionProps> {
  public render() {
    const { className, children, ...attributes } = this.props;
    const accordionClassName = classNames('dk-card', className);
    return (
      <div {...attributes} className={accordionClassName}>
        {children}
      </div>
    );
  }
}

export default Accordion;
