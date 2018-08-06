import './index.scss'

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

  public componentDidMount() {
    console.log('call componentDidMount');
  }

  public render() {
    return (
      <div className="index-container">Index Page</div>
    )
  }
}

function mapStateToProps({ index }: RootState) {
  return {
    index,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
