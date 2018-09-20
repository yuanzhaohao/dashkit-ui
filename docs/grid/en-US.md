# Grid

A grid system based on the flex display property, which refer to [Flexbox Grid](http://flexboxgrid.com/).

<Demos />

### API
#### Grid.Row
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

#### Grid.Col
Property    | Description    | Type      | Default   |
|---------- |-------- |---------- |-------------  |-------- |
| className | className of the component | - | - |
| defaultValue | Default selected value  | -   | - |
| size      | button size, can be set to `small` `large` or omitted   | string  | default  |
| onChange  | `change` event handler | `Function(e: event)` | - |

