# Select

Select component to select value from options.

<div id="demos"></div>

## API

### Select

<div class="api-container">

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| className | className of the component | - | - |
| size | select size, can be set to `small` `large` or omitted | `string` | default |
| name | name of the component | string | - |
| disabled | disable the componnet | `boolean` | false |
| value | The select content value | `string` | - |
| defaultValue | The initial select content | `string` | - |
| placeholder | The placeholder of select | `string` | - |
| multiple | set multiple | boolean | - |
| prefix | The prefix icon for the Input. | `icon type` | - |
| prefixClassName | The className of prefix icon | `string` | - |
| onChange | Called when select an option or input value change | `(options: string[]) => void;` | - |

</div>

### Select.Option

<div class="api-container">

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| className | className of the component | - | - |
| value | className of the option | `number | string` | - |
| disabled | disable the option | `boolean` | false |
| filterOption | deteimin whether to show the option | `boolean | ((inputValue: string, option?: any) => void)` | true |

</div>

### Select.OptionGroup

<div class="api-container">

| Property  | Description                | Type              | Default |
| --------- | -------------------------- | ----------------- | ------- |
| className | className of the component | -                 | -       |
| value     | className of the option    | `number | string` | -       |
| label     | name of the group          | `string`          | -       |

</div>
