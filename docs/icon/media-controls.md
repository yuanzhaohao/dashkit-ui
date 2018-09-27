---
order: 2
title:
  zh-CN: 媒体
  en-US: Media
subtitle:
  zh-CN: 媒体控制。
  en-US: Media controls.
---

```js
import { Icon } from 'dashkit-ui';

class IconList extends React.Component {
  render() {
    const dataSource = Icon.types['media-controls'];

    return (
      <div className="icon-list clearfix">
        {dataSource.map((name, key) =>
          <div className="icon-item-wrapper" key={key}>
            <div className="icon-item">
              <Icon type={name} />
              <p>{name}</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

ReactDOM.render(<IconList />, mountNode);
```