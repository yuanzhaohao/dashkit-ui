# Card

The card is composed of serveral components: Header, Body, and Footer, Collapse, Accordion. It can be combined or used separately.

<Demos />

## API

### Card

| Property   | Description                                             | Type    | Default  |
| ---------- | ------------------------------------------------------- | ------- | -------- |
| className  | className of the component                              | string  | -        |
| collapse   | if `true`, the component renders as `Collapse`          | boolean | false    |
| visible    | whether the component is open                           | boolean | false    |
| onCollapse | Callback function executed when active panel is changed | boolean | Function |

### Card.Header

| Property  | Description                                    | Type     | Default |
| --------- | ---------------------------------------------- | -------- | ------- |
| className | className of the component                     | string   | -       |
| collapse  | if `true`, the component renders as `Collapse` | boolean  | false   |
| visible   | whether the component is active                | boolean  | false   |
| onClick   | Function callback when click header            | Function |

### Card.Body

| Property  | Description                                    | Type    | Default |
| --------- | ---------------------------------------------- | ------- | ------- |
| className | className of the component                     | string  | -       |
| collapse  | if `true`, the component renders as `Collapse` | boolean | false   |
| visible   | whether the component is active                | boolean | false   |

### Card.Footer

| Property  | Description                | Type   | Default |
| --------- | -------------------------- | ------ | ------- |
| className | className of the component | string | -       |

### Card.Collapse

| Property            | Description                         | Type                     | Default |
| ------------------- | ----------------------------------- | ------------------------ | ------- |
| className           | className of the component          | string                   | -       |
| defaultActiveIndexs | Key of the initial active component | `Array<string | number>` | -       |
| activeIndexs        | Key of the active component         | `Array<string | number>` | -       |

### Card.Accordion

| Property           | Description                         | Type              | Default |
| ------------------ | ----------------------------------- | ----------------- | ------- |
| className          | className of the component          | string            | -       |
| defaultActiveIndex | Key of the initial active component | `string | number` | -       |
| activeIndex        | Key of the active component         | `string | number` | -       |
