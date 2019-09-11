---
order: 5
title:
  zh-CN: 尺寸
  en-US: Size
subtitle:
  zh-CN: 可以设置`theme`属性来定义颜色，属性值包括`default`、`error`、`success`, `info`，默认是`default`。
  en-US: set the theme property to either `default`, `error`, `success`, `info`,  respectively. Omit the `theme` property for a button with the default size.
---

```js
import { Input } from 'dashkit-ui';
const inputStyle = {
  marginRight: 10,
  marginBottom: 10,
};

ReactDOM.render(
  <div className="input-list">
    <Input placeholder="default" theme="default" style={inputStyle} />
    <Input placeholder="error" theme="error" style={inputStyle} />
    <Input placeholder="info" theme="info" style={inputStyle} />
    <Input placeholder="warning" theme="warning" style={inputStyle} />
  </div>,
  mountNode,
);
```
