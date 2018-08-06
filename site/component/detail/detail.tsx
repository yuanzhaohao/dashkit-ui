import './detail.less'

import * as React from 'react';
import { connect } from 'react-redux';
import ThreeObj from '../../lib/three-obj';
import Spin from "../common/spin";

interface Props { };
const mapDispatchToProps = {};

class Detail extends React.Component<Props> {
  private threeApp: number;
  public state = {
    isLoading: true,
  };
  constructor(props: Props) {
    super(props);
    this.canvasApp = 0;
  }

  public componentDidMount() {
    // 'http://localhost:8999/static/dog.obj',
    // 'http://localhost:8999/static/male02.obj',
    // 'http://localhost:8999/static/obj.mtl',
    this.canvasApp = new ThreeObj(this.refs['three-canvas'], {
      filePath: './static/male02.obj',
      callback: () => {
        this.setState({
          isLoading: false,
        });
      }
    });

    const render = () => {
      if (this.canvasApp) {
        requestAnimationFrame(render);
        this.canvasApp.render();
      }
    };

    window.addEventListener('resize', this.resizeWindow, false);

    this.canvasApp.initGL();
    this.canvasApp.resizeDisplayGL();
    this.canvasApp.initContent();

    render();
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.resizeWindow, false);
    this.canvasApp.destroy();
    this.canvasApp = 0;
  }

  public render() {
    return (
      <div className="detail-container">
        <Spin className="detail-canvas-wrapper" spinning={this.state.isLoading}>
          <canvas className="detail-canvas" ref="three-canvas"></canvas>
        </Spin>
      </div>
    )
  }

  private resizeWindow = () => {
    if (this.threeApp && this.threeApp.resizeDisplayGL) {
      this.threeApp.resizeDisplayGL();
    }
  }
}

function mapStateToProps(state: any) {
  return state.index
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
