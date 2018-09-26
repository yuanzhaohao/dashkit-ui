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
const { Header, Footer, Sider, Content } = Layout;

ReactDOM.render(
  <div className="layout-list">
    <Layout>
      <Header>Header</Header>
      <Content>Content</Content>
      <Footer>Footer</Footer>
    </Layout>
  </div>,
  mountNode
);
```