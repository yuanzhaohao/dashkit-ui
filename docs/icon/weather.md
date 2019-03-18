---
order: 6
title:
  zh-CN: 天气
  en-US: Weather
subtitle:
  zh-CN: 天气
  en-US: Weather.
---

```js
import { Icon } from 'dashkit-ui';

class IconList extends React.Component {
  render() {
    console.log(Icon.types);
    const dataSource = Icon.types['weather'];

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