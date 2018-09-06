---
order: 1
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
    const media = [
    'fast-forward',
    'pause-circle',
    'pause',
    'play-circle',
    'play',
    'repeat',
    'rewind',
    'shuffle',
    'skip-back',
    'skip-forward',
    'stop-circle',
    'volume-1',
    'volume-2',
    'volume-x',
    'volume',
  ];

    return (
      <div className="icon-list clearfix">
        {media.map((name, key) => 
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