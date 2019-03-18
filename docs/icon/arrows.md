---
order: 7
title:
  zh-CN: 箭头
  en-US: Arrows
subtitle:
  zh-CN: 箭头
  en-US: Arrows.
---

```js
import { Icon } from 'dashkit-ui';

class IconList extends React.Component {
  render() {
    const dataSource = Icon.types['arrows'];

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