# Icon

Simply beautiful icons.

::: example

```meta
title: Basic
subtitle: Use `type` to define Icon's style.
```

```js
import { Icon } from 'dashkit-ui';

ReactDOM.render(
  <div className="icon-list clearfix">
    <div className="icon-item-wrapper">
      <div className="icon-item">
        <Icon type="home" />
        <span>home</span>
      </div>
    </div>
  </div>,
  mountNode
);
```
:::

::: example

```meta
title: Media
subtitle: Media controls.
```

```js
import { Icon } from 'dashkit-ui';

class IconList extends React.Component {
  render() {
    const { media } = context.props.pageData;
    console.log(media);

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

:::
