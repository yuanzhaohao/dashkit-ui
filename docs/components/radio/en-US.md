# Radio

A group of options for multiple choices.

<div id="demos"></div>

## API

### Radio

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| className | className of the component | - | - |
| style | style of the component | - | - |
| disabled | disable the radio | boolean | false |
| checked | determine whether the `Radio` is checked | boolean | - |
| value | value of radio, used for `Radio.Group` | string | - |
| defaultChecked | to set the initial state | boolean | - |
| onChange | `change` event handler | `(event: React.ChangeEvent<HTMLInputElement>) => void` | - |

### Radio.Group

| Property     | Description                | Type                   | Default |
| ------------ | -------------------------- | ---------------------- | ------- |
| className    | className of the component | -                      | -       |
| defaultValue | Default selected value     | -                      | -       |
| value        | value of the Radio Group   | any                    | -       |
| defaultValue | default of the Radio Group | any                    | -       |
| onChange     | `change` event handler     | `(value: any) => void` | -       |
