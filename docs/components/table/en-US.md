# Table

A table displays rows of data.

<div id="demos"></div>

## API

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| className | className of the component | - | - |
| title | show the title | `string` | - |
| columns | Columns of table | `ColumnProps` | - |
| dataSource | Data record array to be displayed | `any[]` | - |
| fixed | determin the Header to be fixed | `boolean` | false |
| onChange | `change` event handler | - | - |
| scroll | when fixed the Header, set the scrollX and scrollY | `{ x: number | true, y: number }` | - |
| pagination | determin whether to show the Pagination, and set the position of it | `boolean | PaginationProps & {position?: 'top' | 'bottom'}` | false |
