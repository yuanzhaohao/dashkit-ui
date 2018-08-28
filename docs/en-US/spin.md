# Spin

A simple yet versatile animated spinner component.

:::example

```meta
title: Basic
subtitle: Use `spining` to decide wheather it is shown.
```

```js
ReactDOM.render(
  <Spin spining={true} />,
  mountNode
);
```
:::

:::example

```meta
title: Sizes
subtitle: Use `size` to change sizes.
```

```js
ReactDOM.render(
  <div className="spin-list">
    <Spin spining={true} size="small" />
    <Spin spining={true} size="default" />
    <Spin spining={true} size="large" />
  </div>,
  mountNode
);
```
:::

:::example

```meta
title: Description
subtitle: Use `text` to define description.
```

```js
ReactDOM.render(
  <Spin spining={true} text="Loading..." />,
  mountNode
);
```
:::