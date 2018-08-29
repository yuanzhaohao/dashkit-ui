# Button

Buttons for actions in forms, dialogs, and more with support for multiple sizes, states, and more.

::: example

```meta
title: Basic
subtitle: Use `type`, `outline`, `round` and `circle` to define Button's style.
```

```js
import { Button } from 'dashkit-ui';

ReactDOM.render(
  <div className="button-wrapper">
    <div className="button-list">
      <Button>Default</Button>
      <Button type="primary">Primary</Button>
      <Button type="success">Success</Button>
      <Button type="warning">Warning</Button>
      <Button type="danger">Danger</Button>
      <Button type="info">Info</Button>
      <Button type="link">Link</Button>
    </div>

    <div className="button-list">
      <Button outline={true}>Outline</Button>
      <Button type="primary" outline={true}>Primary</Button>
      <Button type="success" outline={true}>Success</Button>
      <Button type="warning" outline={true}>Warning</Button>
      <Button type="danger" outline={true}>Danger</Button>
      <Button type="info" outline={true}>Info</Button>
    </div>

    <div className="button-list">
      <Button round={true}>Round</Button>
      <Button type="primary" round={true}>Primary</Button>
      <Button type="success" round={true}>Success</Button>
      <Button type="warning" round={true}>Warning</Button>
      <Button type="danger" round={true}>Danger</Button>
      <Button type="info" round={true}>Info</Button>
    </div>
  </div>,
  mountNode
);
```
:::

::: example

```meta
title: Sizes
subtitle: If a large or small button is desired, set the size property to either `large` or `small` respectively. Omit the `size` property for a button with the default size.
```

```js
import { Button } from 'dashkit-ui';

ReactDOM.render(
  <div className="button-list">
    <Button size="large">Large</Button>
    <Button size="default">Default</Button>
    <Button size="small">Small</Button>
    <Button type="primary" size="large" round={true}>Large</Button>
    <Button type="primary" size="default" round={true}>Default</Button>
    <Button type="primary" size="small" round={true}>Small</Button>
  </div>,
  mountNode
);
```
:::