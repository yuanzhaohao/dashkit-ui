# Modal

Informs users while preserving the current page state.

<Demos />

## API

| Property   | Description                                    | Type               | Default |
| ---------- | ---------------------------------------------- | ------------------ | ------- |
| className  | className of the component                     | `string`           | -       |
| disabled   | disable the button                             | `boolean`          | false   |
| okText     | text of OK button                              | `string`           | -       |
| cancelText | text of cancel button                          | `string`           | -       |
| onConfirm  | callback when clicked confirm button           | `Function`         | -       |
| onCancel   | callback when clicked cancel button            | `Function`         | -       |
| footer     | footer component                               | `React.React.Node` | -       |
| showFooter | determine whether to show the footer component | `boolean`          | -       |
| closeByEsc | cancel the modal when click `esc` keyborad     | `boolean`          | -       |
| visible    | determine the modal is active                  | `boolean`          | -       |
| width      | the `width` style of the modal                 | `boolean`          | -       |

### Modal.method()

- Modal.info
- Modal.success
- Modal.error
- Modal.warning
- Modal.warn
- Modal.confirm
