# Checkbox

Buttons for actions in forms, dialogs, and more with support for multiple sizes, states, and more.

<Demos />

## API
### Checkbox
Property    | Description    | Type      | Default   |
|---------- |-------- |---------- |-------------  |-------- |
| className | className of the component | - | - |
| style | style of the component | - | - |
| disabled  | disable the checkbox   | boolean | false   |
| checked  | value of checkbox | boolean  |  -  |
| defaultChecked  | default value | boolean  |  -  |
| onChange | `change` event handler | `(event: React.ChangeEvent<HTMLInputElement>) => void` | - |

### Checkbox.Group
Property    | Description    | Type      | Default   |
|---------- |-------- |---------- |-------------  |-------- |
| className | className of the component | - | - |
| defaultValue | Default selected value  | -   | - |
| min       | Minimum   | number  | -  |
| max       | Maximum   | number  | -  |
| onChange  | `change` event handler | `(options: string[]) => void` | - |

