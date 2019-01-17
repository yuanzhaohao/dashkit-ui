# Radio

A group of options for multiple choices.

<Demos />

## Radio
### Radio
Property    | Description    | Type      | Default   |
|---------- |-------- |---------- |-------------  |-------- |
| className | className of the component | - | - |
| style | style of the component | - | - |
| disabled  | disable the radio   | boolean | false   |
| checked  | value of radio | boolean  |  -  |
| defaultChecked  | default value | boolean  |  -  |
| onChange | `change` event handler | `(event: React.ChangeEvent<HTMLInputElement>) => void` | - |

### Radio.Group
Property    | Description    | Type      | Default   |
|---------- |-------- |---------- |-------------  |-------- |
| className | className of the component | - | - |
| defaultValue | Default selected value  | -   | - |
| min       | Minimum   | number  | -  |
| max       | Maximum   | number  | -  |
| onChange  | `change` event handler | `(options: string[]) => void` | - |

