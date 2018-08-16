import './style.scss';

import * as classNames from 'classnames';
import * as React from 'react';

export type CardProps = {
  className?: string;
};

class Card extends React.Component<CardProps> {
  render() {
    return (
      <div className="card"></div>
    );
  }
}
export default Card;
