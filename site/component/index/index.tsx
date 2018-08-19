import './style.scss'

import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../redux/reducer';
import * as indexAction from '../../redux/index/action';

type Props = {};
const mapDispatchToProps = {
  ...indexAction,
};

class Index extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  public render() {
    return (
      <div className="page-container">
        <h1 className="index-title">Dashkit UI</h1>
        <p className="index-desc">A component library for developers, designers and product managers.</p>
      </div>
    )
  }
}

function mapStateToProps({ index }: RootState) {
  return {
    index,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
