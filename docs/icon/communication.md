---
order: 3
title:
  zh-CN: 交流
  en-US: Communication
subtitle:
  zh-CN: 交流
  en-US: Communication icons.
---

```js
import { Icon } from 'dashkit-ui';

class IconList extends React.Component {
  render() {
    console.log(Icon.types);
    const dataSource = Icon.types['communication'];

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