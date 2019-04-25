import * as React from 'react';
import * as classNames from 'classnames';
import { createConsumer } from './context';

export type SelectOptionProps = {
  prefixCls?: string;
  value?: string | number;
  onClick?: (value: string | number) => void
};

class Option extends React.Component<SelectOptionProps> {
  render() {
    const { prefixCls, value, ...attributes } = this.props;
    const optionClassName = classNames({
      [`${prefixCls}-option`]: true,
    });
    return (
      <div className={optionClassName} {...attributes} onClick={this.handleOptionClick} />
    );
  }

  handleOptionClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const { value } = this.props;

    console.log(value);
  }
}

export default createConsumer(Option);
