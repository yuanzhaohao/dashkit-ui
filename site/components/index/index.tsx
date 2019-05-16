import './style.scss';

import * as React from 'react';

class Index extends React.Component {
  public render() {
    return (
      <div className="page-container">
        <h1 className="index-title">Dashkit UI</h1>
        <p className="index-desc">
          A component library for developers, designers and product managers.
        </p>
      </div>
    );
  }
}

export default Index;
