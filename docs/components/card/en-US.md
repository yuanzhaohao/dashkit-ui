# Card

The card is composed of serveral components: Header, Body, and Footer, Collapse, Accordion. It can be combined or used separately.

<div id="demos"></div>

## API

### Card

<div class="api-container">

| Property   | Description                                             | Type    | Default  |
| ---------- | ------------------------------------------------------- | ------- | -------- |
| className  | className of the component                              | string  | -        |
| collapse   | if `true`, the component renders as `Collapse`          | boolean | false    |
| visible    | whether the component is open                           | boolean | false    |
| onCollapse | Callback function executed when active panel is changed | boolean | Function |

</div>

### Card.Header

<div class="api-container">

| Property  | Description                                    | Type     | Default |
| --------- | ---------------------------------------------- | -------- | ------- |
| className | className of the component                     | string   | -       |
| collapse  | if `true`, the component renders as `Collapse` | boolean  | false   |
| visible   | whether the component is active                | boolean  | false   |
| onClick   | Function callback when click header            | Function |

</div>

### Card.Body

<div class="api-container">

| Property  | Description                                    | Type    | Default |
| --------- | ---------------------------------------------- | ------- | ------- |
| className | className of the component                     | string  | -       |
| collapse  | if `true`, the component renders as `Collapse` | boolean | false   |
| visible   | whether the component is active                | boolean | false   |

</div>

### Card.Footer

<div class="api-container">

| Property  | Description                | Type   | Default |
| --------- | -------------------------- | ------ | ------- |
| className | className of the component | string | -       |

</div>

### Card.Collapse

<div class="api-container">

| Property            | Description                         | Type                     | Default |
| ------------------- | ----------------------------------- | ------------------------ | ------- |
| className           | className of the component          | string                   | -       |
| defaultActiveIndexs | Key of the initial active component | `Array<string | number>` | -       |
| activeIndexs        | Key of the active component         | `Array<string | number>` | -       |

</div>

### Card.Accordion

<div class="api-container">

| Property           | Description                         | Type              | Default |
| ------------------ | ----------------------------------- | ----------------- | ------- |
| className          | className of the component          | string            | -       |
| defaultActiveIndex | Key of the initial active component | `string | number` | -       |
| activeIndex        | Key of the active component         | `string | number` | -       |

</div>
