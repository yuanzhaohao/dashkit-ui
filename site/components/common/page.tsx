import * as React from 'react';
import './page.scss';

import * as ReactDOM from 'react-dom';
import { Spin, Grid } from 'dashkit-ui';
import Example from './example';
const { Row, Col } = Grid;

interface PageProps {
  locale: string;
  page: string;
}

type PageState = {
  dataSource?: {
    markdown: string;
    demos: object[];
  } | null;
};

class Page extends React.PureComponent<PageProps, PageState> {
  constructor(props: PageProps) {
    super(props);
    this.state = {
      dataSource: null,
    };
  }

  public async componentDidMount() {
    const { page, locale } = this.props;
    console.log(page);
    const dataSource = await import(`../../../docs/${page.toLocaleLowerCase()}/${locale}.md`);

    this.setState({
      dataSource,
    });
  }

  public componentDidUpdate() {
    const { dataSource } = this.state;
    const { locale } = this.props;
    const demoElement = document.getElementById('demos');

    if (demoElement && dataSource.demos && Object.keys(dataSource.demos)) {
      const demoData = Object.keys(dataSource.demos)
        .map(key => dataSource.demos[key])
        .sort((a, b) => a.meta.order - b.meta.order);
      const children = demoData.map((d, key) => {
        return <Example key={key} locale={locale} dataSource={d} />;
      });
      ReactDOM.render(children, demoElement);
    }
  }

  public render() {
    const { dataSource } = this.state;

    return (
      <Grid className="app-page" fluid>
        <Row center="xs">
          <Col xs={12} md={10} lg={8}>
            {dataSource && dataSource.markdown ? (
              <div
                className="app-page-info"
                dangerouslySetInnerHTML={{
                  __html: dataSource.markdown,
                }}
              />
            ) : (
              <div className="page-loading">
                <Spin text="Loading..." spinning={true} />
              </div>
            )}
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Page;
