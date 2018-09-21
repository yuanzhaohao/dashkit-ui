import * as React from 'react';
import './page.scss';

import * as ReactDOM from 'react-dom';
import { RouteComponentProps } from 'react-router-dom';
import { Spin, Grid } from '../../../src';
import Example from './example';
const { Row, Col } = Grid;

interface PageProps extends RouteComponentProps<PageProps> {
  dataSource: any;
  locale?: string;
};

type PageState = {
  dataSource?: {
    markdown: string;
    demos: Object[];
  } | null;
}

class Page extends React.PureComponent<PageProps, PageState> {
  constructor(props: PageProps) {
    super(props);
    this.state = {
      dataSource: null
    }
  }

  async componentDidMount() {
    const page = this.props.location.pathname.replace('/components/', '');
    const locale = window.localStorage.getItem('DASHKIT_UI_LOCALE') || 'en-US';
    const dataSource = await import(`../../../docs/${page}/${locale}.md`);

    console.log(dataSource);

    this.setState({
      dataSource,
    });

    const demoElement = document.getElementById('demos');

    if (demoElement && dataSource.demos && Object.keys(dataSource.demos)) {
      const children: any[] = [];
      const demoData = Object.keys(dataSource.demos)
        .map(key => dataSource.demos[key])
        .sort((a, b) => a.meta.order - b.meta.order);

      demoData.forEach((d, key) => {
        const child = (
          <Example
            key={key}
            locale={locale}
            dataSource={d}
          />
        );
        children.push(child);
      });

      ReactDOM.render(children, demoElement);
    }
  }

  render() {
    const { dataSource } = this.state;

    return (
      <Grid className="app-page" fluid>
        <Row center="xs">
          <Col xs={12} md={10} lg={8}>
            {dataSource && dataSource.markdown
              ? <div className="app-page-info" dangerouslySetInnerHTML={{
                __html: dataSource.markdown
              }} />
              : <div className="page-loading">
                <Spin text="Loading..." spinning={true} />
              </div>
            }
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default Page;