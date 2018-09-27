---
order: 1
title:
  zh-CN: 核心
  en-US: Core
subtitle:
  zh-CN: 核心icon
  en-US: Core icons.
---

```js
import { Icon } from 'dashkit-ui';

class IconList extends React.Component {
  render() {
    const dataSource = Icon.types['core'];

    return (
      <div className="icon-list clearfix">
        {dataSource.map((name, key) =>
          <div className="icon-item-wrapper" key={key}>
            <div className="icon-item">
              <Icon type={name} />
              <span>{name}</span>
            </div>
          </div>
        )}
      </div>
    );
  }
}

ReactDOM.render(<IconList />, mountNode);
```