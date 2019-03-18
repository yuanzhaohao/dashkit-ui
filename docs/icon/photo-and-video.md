---
order: 4
title:
  zh-CN: 图片影片
  en-US: Photo and video
subtitle:
  zh-CN: 图片影片
  en-US: Photo and video.
---

```js
import { Icon } from 'dashkit-ui';

class IconList extends React.Component {
  render() {
    console.log(Icon.types);
    const dataSource = Icon.types['photo-and-video'];

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