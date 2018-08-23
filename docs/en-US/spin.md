# Spin

A simple yet versatile animated spinner component.

:::example

```meta
title: Basic
subtitle: Use `spining` to decide wheather it is shown.
```

```js
render() {
  return <Spin spining={true} />
}
```
:::

:::example

```meta
title: Sizes
subtitle: Use `size` to change sizes.
```

```js
render() {
  return (
    <div className="spin-list">
      <Spin spining={true} size="small" />
      <Spin spining={true} size="default" />
      <Spin spining={true} size="large" />
    </div>
  );
}
```
:::

<!---

```meta
title: Description
subtitle: Use `text` to define description.
```

```js
render() {
  return (
    <Spin spining={true} text="Loading..." />
  );
}
```
:::
--->