import './style.scss'

import * as React from 'react';
import { Button } from '../../../src/index';
import Example from '../common/example';

type Props = {};

class PageButton extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    return (
      <div className="page-container button-page">
        <div className="page-header">
          <h1 className="page-title">Spin</h1>
          <p className="page-subtitle">A simple yet versatile animated spinner component.</p>
        </div>

        <h2 className="module-title">Example</h2>
        <Example title="Basic usage" desc="Use type, outline, round and circle to define Button's style.">
        </Example>
      </div>
    )
  }
}

export default PageButton;
