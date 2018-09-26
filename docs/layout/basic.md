---
order: 0
title:
  zh-CN: 基本
  en-US: Basic
subtitle:
  zh-CN: 基本用法。
  en-US: Classic page layouts.
---

```js
import { Layout } from 'dashkit-ui';
const { Header, Footer, Sidebar, Content } = Layout;

ReactDOM.render(
  <div className="layout-list">
    <Layout>
      <Header>Header</Header>
      <Content>Content</Content>
      <Footer>Footer</Footer>
    </Layout>

    <Layout>
      <Header>Header</Header>
      <Layout>
        <Sidebar>Sidebar</Sidebar>
        <Content>Content</Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>

    <Layout>
      <Header>Header</Header>
      <Layout>
        <Content>Content</Content>
        <Sidebar>Sidebar</Sidebar>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>

    <Layout>
      <Sidebar>Sidebar</Sidebar>
      <Layout>
        <Header>Header</Header>
        <Content>Content</Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  </div>,
  mountNode
);
```