# Pagination

Indicates a series of related content exists across multiple pages. 

::: example

```meta
title: Basic
subtitle: Basic usage.
```

```js
import { Pagination } from 'dashkit-ui';

ReactDOM.render(
  <Pagination
    total={500}
    current={10}
    pageSize={10}
  />,
  mountNode
);
```
:::

::: example

```meta
title: Sizes
subtitle: Pagination component provides three additional sizes for you to choose among different scenarios.
```

```js
import { Pagination } from 'dashkit-ui';

ReactDOM.render(
  <div className="pagination-wrapper">
    <Pagination
      total={500}
      current={10}
      pageSize={10}
      size="large"
    />
    <Pagination
      total={500}
      current={10}
      pageSize={10}
      size="default"
    />
    <Pagination
      total={500}
      current={10}
      pageSize={10}
      size="small"
    />
  </div>,
  mountNode
);
```
:::

::: example

```meta
title: Disabled
subtitle: The `disabled` attribute determines if the pagination is disabled.
```

```js
import { Pagination } from 'dashkit-ui';

ReactDOM.render(
  <Pagination
    total={500}
    current={10}
    pageSize={10}
    disabled={true}
  />,
  mountNode
);
```
:::

## API

Property    | Description    | Type      | Default   |
|---------- |-------- |---------- |-------------  |-------- |
| className | className of the component | - | - |
| total     | total number of pages   | number  | 0  |
| current   | current page   | number | 1  |
| pageSize  | number of each page | number  |  20  |
| range  | number of display pages | number  |  7  |
| onChange | `change` event handler | - | - |