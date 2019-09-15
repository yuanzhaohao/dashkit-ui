---
order: 2
title:
  zh-CN: 加载中
  en-US: Loading
subtitle:
  zh-CN: 使用`loading`来决定是否显示加载中的状态，默认值是`false`。
  en-US: Add the `loading` property to determine if the button is loading.
---

```js
import { Button } from 'dashkit-ui';

ReactDOM.render(
  <div className="button-wrapper">
    <div className="button-list">
      <Button>Default</Button>
      <Button loading>Default loading</Button>
    </div>
    <div className="button-list">
      <Button type="primary" icon="loading">
        Primary
      </Button>
      <Button type="primary" loading>
        Default loading
      </Button>
    </div>
    <div className="button-list">
      <Button type="success">Success</Button>
      <Button type="success" loading>
        Success loading
      </Button>
    </div>
    <div className="button-list">
      <Button type="warning">Warning</Button>
      <Button type="warning" loading>
        Warning loading
      </Button>
    </div>
    <div className="button-list">
      <Button type="danger">Danger</Button>
      <Button type="danger" loading>
        Danger loading
      </Button>
    </div>
    <div className="button-list">
      <Button type="info">Info</Button>
      <Button type="info" loading>
        Info loading
      </Button>
    </div>
  </div>,
  mountNode,
);
```
