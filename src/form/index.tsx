import './style.scss';

import * as classNames from 'classnames';
import * as React from 'react';

export type FormProps = {
  className?: string;
};

class Form extends React.Component<FormProps> {
  render() {
    const { className, children, ...attributes } = this.props;
    const formClassName = classNames(
      'dashkit-card',
      className,
    );
    return (
      <div {...attributes} className={formClassName}>
        {children}
      </div>
    );
  }
}

export default Form;
