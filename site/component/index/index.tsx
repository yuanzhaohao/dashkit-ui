import './index.less'

import * as React from 'react';
import { connect } from 'react-redux';
import ThreePly from '../../lib/three-ply';

interface Props {};
const mapDispatchToProps = {};

class Index extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.threeApp = 0;
  }

  public componentDidMount() {
    this.threeApp = new ThreePly(
      this.refs['three-canvas'],
      './static/Lucy100k.ply',
      // 'https://threejs.org/examples/models/ply/binary/Lucy100k.ply'
    );
  }

  public render() {
    return (
      <div className="index-container">
        <div className="index-inner" ref="three-canvas"></div>
      </div>
    )
  }
}

function mapStateToProps(state: any) {
  return state.index
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
