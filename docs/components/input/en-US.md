# Input

Dashkit supports all of Bootstrap's default form styling in addition to a handful of new input types and features.

<div id="demos"></div>

## API

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| className | className of the component | - | - |
| size | input size, can be set to `small` `large` or omitted | string | default |
| name | name of the component | string | - |
| disabled | disable the componnet | boolean | false |
| value | The input content value | string | - |
| defaultValue | The initial input content | string | - |
| placeholder | The placeholder of input | string | - |
| type | type of input | `'text' | 'password' | 'number'` | text |
| digits | digits of number input | number | - |
| prefix | The prefix icon for the Input. | icon type | - |
| prefixClassName | The className of prefix icon | string | - |
| suffix | The prefix icon for the Input. | icon type | - |
| suffixClassName | The className of suffix icon | string | - |
| wrapperClassName | The className of suffix icon | string | - |
| wrapperRef | ref of the wrapper | `React.RefObject<HTMLDivElement>` | - |
| onChange | value of input is changed | `React.RefObject<HTMLDivElement>` | - |
| onFocus | Called when focus | `(event: React.ChangeEvent<HTMLInputElement>) => void;` | - |
| onBlur | Called when blur | `(event: React.ChangeEvent<HTMLInputElement>) => void;` | - |
