# Message

A message is displayed at top and center and will be dismissed automatically.

<div id="demos"></div>

## API

| Property           | Description                          | Type       | Default |
| ------------------ | ------------------------------------ | ---------- | ------- |
| className          | className of the component           | -          | -       |
| max                | maximum of the total messages        | `number`   | -       |
| onDestory          | callback when the message is destory | `Function` | -       |
| transitionDuration | transition duration of the message   | `number`   | -       |

This components provides some static methods, with usage and arguments as following:

- `message.success(content, [duration], onClose)`
- `message.error(content, [duration], onClose)`
- `message.info(content, [duration], onClose)`
- `message.warning(content, [duration], onClose)`
- `message.warn(content, [duration], onClose)` // alias of warning
- `message.loading(content, [duration], onClose)`
