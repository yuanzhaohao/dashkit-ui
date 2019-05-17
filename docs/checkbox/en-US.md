# Checkbox

A group of options for multiple choices.

<Demos />

## API

### Checkbox

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| className | className of the component | - | - |
| style | style of the component | - | - |
| disabled | disable the radio | boolean | false |
| checked | determine whether the `Checkbox` is checked | boolean | - |
| value | value of radio, used for `Checkbox.Group` | string | - |
| defaultChecked | to set the initial state | boolean | - |
| onChange | `change` event handler | `(event: React.ChangeEvent<HTMLInputElement>) => void` | - |

### Checkbox.Group

| Property     | Description                | Type                          | Default |
| ------------ | -------------------------- | ----------------------------- | ------- |
| className    | className of the component | -                             | -       |
| defaultValue | Default selected value     | -                             | -       |
| min          | Minimum                    | number                        | -       |
| max          | Maximum                    | number                        | -       |
| name         | name of the component      | string                        | -       |
| value        | value of the Radio Group   | string                        | -       |
| defaultValue | default of the Radio Group | string[]                      | -       |
| onChange     | `change` event handler     | `(options: string[]) => void` | -       |
