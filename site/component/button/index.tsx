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
          <h1 className="page-title">Button</h1>
          <p className="page-subtitle">Buttons for actions in forms, dialogs, and more with support for multiple sizes, states, and more.</p>
        </div>

        <h2 className="module-title">Example</h2>
        <Example title="Basic usage">
          <Button>Default</Button>
          <Button type="primary">Primary</Button>
          <Button type="success">Success</Button>
          <Button type="warning">Warning</Button>
          <Button type="danger">Danger</Button>
          <Button type="info">Info</Button>
          <Button type="link">Link</Button>
        </Example>
      </div>
    )
  }
}

export default PageButton;
