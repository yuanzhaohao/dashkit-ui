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
      <Button loading size="large">
        Default
      </Button>
      <Button loading>Default</Button>
      <Button loading size="small">
        Default
      </Button>
    </div>
    <div className="button-list">
      <Button type="primary" size="large" loading>
        Primary
      </Button>
      <Button type="primary" loading>
        Primary
      </Button>
      <Button type="primary" size="small" loading>
        Primary
      </Button>
    </div>
    <div className="button-list">
      <Button type="success" size="large" loading>
        success
      </Button>
      <Button type="success" loading>
        success
      </Button>
      <Button type="success" size="small" loading>
        success
      </Button>
    </div>
    <div className="button-list">
      <Button type="warning" size="large" loading>
        warning
      </Button>
      <Button type="warning" loading>
        warning
      </Button>
      <Button type="warning" size="small" loading>
        warning
      </Button>
    </div>
    <div className="button-list">
      <Button type="danger" size="large" loading>
        danger
      </Button>
      <Button type="danger" loading>
        danger
      </Button>
      <Button type="danger" size="small" loading>
        danger
      </Button>
    </div>
    <div className="button-list">
      <Button type="info" size="large" loading>
        info
      </Button>
      <Button type="info" loading>
        info
      </Button>
      <Button type="info" size="small" loading>
        info
      </Button>
    </div>
  </div>,
  mountNode,
);
```
