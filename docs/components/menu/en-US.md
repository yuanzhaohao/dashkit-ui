# Menu

Powerful and responsive navigation header, the menu. Includes support for branding, navigation, and more, including support for the collapse plugin

<div id="demos"></div>

## API

### Menu

<div class="api-container">

| Property         | Description                        | Type                        | Default    |
| ---------------- | ---------------------------------- | --------------------------- | ---------- |
| className        | className of the component         | -                           | -          |
| activeKey        | key of selected `MenuItem`         | `string`                    | -          |
| defaultActiveKey | initial key of selected `MenuItem` | `string`                    | -          |
| defaultOpenKeys  | opened key of `Submenu`            | `string`                    | -          |
| mode             | type of the menu                   | `'horizontal' | 'vertical'` | `vertical` |
| theme            | color theme of the menu            | `'dark' | 'light'`          | `light`    |
| onSelect         | selected event handler             | `Function`                  | -          |
| onOpen           | callback when a Submenu is opened  | `Function`                  | -          |

</div>

### Menu.Item

<div class="api-container">

| Property  | Description                | Type       | Default |
| --------- | -------------------------- | ---------- | ------- |
| className | className of the component | -          | -       |
| index     | key of the component       | `string`   | -       |
| disabled  | disbaled the component     | `boolean`  | `false` |
| icon      | icon type                  | `IconType` | -       |

</div>

### Menu.ItemGroup

<div class="api-container">

| Property  | Description                | Type      | Default |
| --------- | -------------------------- | --------- | ------- |
| className | className of the component | -         | -       |
| title     | title of the component     | `boolean` | `false` |

</div>

### Menu.SubMenu

<div class="api-container">

| Property  | Description                | Type       | Default |
| --------- | -------------------------- | ---------- | ------- |
| className | className of the component | -          | -       |
| title     | title of the component     | `boolean`  | `false` |
| icon      | icon type                  | `IconType` | -       |
| index     | key of the component       | `string`   | -       |

</div>
