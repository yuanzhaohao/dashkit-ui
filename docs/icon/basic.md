---
order: 0
title:
  zh-CN: 基本
  en-US: Basic
subtitle:
  zh-CN: 使用`type`来控制样式s。
  en-US: use `type` to detemine the style of a icon.
---

```js
import { Icon } from 'dashkit-ui';

ReactDOM.render(
  <div className="icon-list clearfix">
    <div className="icon-item-wrapper">
      <div className="icon-item">
        <Icon type="home" />
        <p>home</p>
      </div>
    </div>
  </div>,
  mountNode
);
```