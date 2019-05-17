# Select

Select component to select value from options.

<Demos />

## API

### Select

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| className | className of the component | - | - |
| size | select size, can be set to `small` `large` or omitted | string | default |
| name | name of the component | string | - |
| disabled | disable the componnet | boolean | false |
| value | The select content value | string | - |
| defaultValue | The initial select content | string | - |
| placeholder | The placeholder of select | string | - |
| multiple | set multiple | boolean | - |
| prefix | The prefix icon for the Input. | icon type | - |
| prefixClassName | The className of prefix icon | string | - |
| onChange | Called when select an option or input value change | `(options: string[]) => void;` | - |
