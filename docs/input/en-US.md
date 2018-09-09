# Input

Dashkit supports all of Bootstrap's default form styling in addition to a handful of new input types and features.

<Demos />

### API 
#### Input
Property    | Description    | Type      | Default   |
|---------- |-------- |---------- |-------------  |-------- |
| className | className of the component | - | - |
| size     | button size, can be set to `small` `large` or omitted   | string  | default  |
| type     | button type, can be set to `primary` `success` `warning` `danger` `info` `link` or ommited   | string |  default   |
| outline   | determine whether it's a outline button   | boolean | false   |
| round     | determine whether it's a round button   | boolean | false   |
| disabled  | disable the button    | boolean | false   |
| loading   | determine whether it's loading   | boolean | false  |
| icon  | button icon, see `Icon` component | string  |  -  |
| onClick | `click` event handler | - | - |

#### Input.Group
Property    | Description    | Type      | Default   |
|---------- |-------- |---------- |-------------  |-------- |
| className | className of the component | - | - |
| defaultValue | Default selected value  | -   | - |
| size      | button size, can be set to `small` `large` or omitted   | string  | default  |
| onChange  | `change` event handler | `Function(e: event)` | - |

