---
order: 5
title:
  zh-CN: 地理位置
  en-US: Location
subtitle:
  zh-CN: 地理位置
  en-US: Location.
---

```js
import { Icon } from 'dashkit-ui';
import types from 'dashkit-ui/icon/types';

class IconList extends React.Component {
  render() {
    const dataSource = types['location'];

    return (
      <div className="icon-list clearfix">
        {dataSource.map((name, key) => (
          <div className="icon-item-wrapper" key={key}>
            <div className="icon-item">
              <Icon type={name} />
              <span>{name}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

ReactDOM.render(<IconList />, mountNode);
```
