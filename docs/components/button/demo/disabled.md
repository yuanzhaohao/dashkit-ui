---
order: 3
title:
  zh-CN: 禁用
  en-US: Disabled
subtitle:
  zh-CN: 使用`disabled`来决定是否禁用按钮，默认值是`false`。
  en-US: Add the `disabled` property to determine if the button is disabled.
---

```js
import { Button } from 'dashkit-ui';

ReactDOM.render(
  <div className="button-wrapper">
    <div className="button-list">
      <Button>Default</Button>
      <Button disabled={true}>Default Disabled</Button>
    </div>
    <div className="button-list">
      <Button type="primary">Primary</Button>
      <Button type="primary" disabled>
        Default Disabled
      </Button>
    </div>
    <div className="button-list">
      <Button type="success">Success</Button>
      <Button type="success" disabled>
        Success Disabled
      </Button>
    </div>
    <div className="button-list">
      <Button type="warning">Warning</Button>
      <Button type="warning" disabled>
        Warning Disabled
      </Button>
    </div>
    <div className="button-list">
      <Button type="danger">Danger</Button>
      <Button type="danger" disabled>
        Danger Disabled
      </Button>
    </div>
    <div className="button-list">
      <Button type="info">Info</Button>
      <Button type="info" disabled>
        Info Disabled
      </Button>
    </div>
    <div className="button-list">
      <Button type="link">Link</Button>
      <Button type="link" disabled>
        Link Disabled
      </Button>
    </div>
  </div>,
  mountNode,
);
```
