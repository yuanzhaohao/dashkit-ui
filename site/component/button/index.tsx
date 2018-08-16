import './style.scss'

import * as React from 'react';
import { Button } from '../../../src/index';

type Props = {};

class PageButton extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    return (
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">Button</h1>
          <p className="page-subtitle">Buttons for actions in forms, dialogs, and more with support for multiple sizes, states, and more.</p>
        </div>
      </div>
    )
  }
}

export default PageButton;
