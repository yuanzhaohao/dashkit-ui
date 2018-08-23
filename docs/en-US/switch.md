# Switch

Replaces a standard checkbox input with a switch button.

:::example

```meta
title: Basic
subtitle: The most basic usage.
```

```js
// import { Switch } from 'dashkit-ui';

function onChange(checked) {
  console.log(`switch to ${checked}`);
}

ReactDOM.render(
  <Switch defaultChecked onChange={onChange} />,
  mountNode
);
```
:::