webpackJsonp([87],{XkwD:function(t,e){t.exports={markdown:"<hr>\n<h2>order: 0\ntitle:\nzh-CN: 基本\nen-US: Basic\nsubtitle:\nzh-CN: 基本用法，可以用<code>defaultChecked</code>来定义checkbox默认的值。\nen-US: It includes all kinds of input items, such as input, select, radio and checkbox.</h2>\n<pre><code class=\"language-js\">import { Form, Input, Button, Select, Calendar, Switch, Checkbox, Radio } from 'dashkit-ui';\n\nconst cityOptions = ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen'];\n\nclass App extends React.Component {\n  render() {\n    console.log(&lt;Form /&gt;);\n    return (\n      &lt;Form onSubmit={this.handleSubmit} labelWidth={150}&gt;\n        &lt;Form.Item label=&quot;Name&quot; name=&quot;name&quot;&gt;\n          &lt;Input placeholder=&quot;Please input your name&quot; /&gt;\n        &lt;/Form.Item&gt;\n        &lt;Form.Item label=&quot;Email&quot; name=&quot;email&quot;&gt;\n          &lt;Input placeholder=&quot;Please input your email&quot; /&gt;\n        &lt;/Form.Item&gt;\n        &lt;Form.Item label=&quot;Zone&quot; name=&quot;zone&quot;&gt;\n          &lt;Select placeholder=&quot;Please select your zone&quot;&gt;\n            &lt;Select.Option value=&quot;zone1&quot;&gt;Zone 1&lt;/Select.Option&gt;\n            &lt;Select.Option value=&quot;zone2&quot;&gt;Zone 2&lt;/Select.Option&gt;\n          &lt;/Select&gt;\n        &lt;/Form.Item&gt;\n        &lt;Form.Item label=&quot;Date&quot; name=&quot;date&quot;&gt;\n          &lt;Calendar /&gt;\n        &lt;/Form.Item&gt;\n        &lt;Form.Item label=&quot;Range Time&quot; name=&quot;rangTime&quot;&gt;\n          &lt;Calendar type=&quot;datetime&quot; range /&gt;\n        &lt;/Form.Item&gt;\n        &lt;Form.Item label=&quot;Switch&quot; name=&quot;switch&quot;&gt;\n          &lt;Switch /&gt;\n        &lt;/Form.Item&gt;\n        &lt;Form.Item label=&quot;CheckboxGroup&quot; name=&quot;checkboxGroup&quot;&gt;\n          &lt;Checkbox.Group options={cityOptions}&gt;\n            {cityOptions.map((city, index) =&gt; (\n              &lt;Checkbox key={index} value={city}&gt;\n                {city}\n              &lt;/Checkbox&gt;\n            ))}\n          &lt;/Checkbox.Group&gt;\n        &lt;/Form.Item&gt;\n        &lt;Form.Item label=&quot;Checkbox&quot; name=&quot;checkbox&quot;&gt;\n          &lt;Checkbox&gt;checkbox&lt;/Checkbox&gt;\n        &lt;/Form.Item&gt;\n        &lt;Form.Item label=&quot;RadioGroup&quot; name=&quot;radioGroup&quot;&gt;\n          &lt;Radio.Group&gt;\n            &lt;Radio value={1}&gt;A&lt;/Radio&gt;\n            &lt;Radio value={2}&gt;B&lt;/Radio&gt;\n            &lt;Radio value={3}&gt;C&lt;/Radio&gt;\n            &lt;Radio value={4}&gt;D&lt;/Radio&gt;\n          &lt;/Radio.Group&gt;\n        &lt;/Form.Item&gt;\n        &lt;Form.Item label=&quot;Radio&quot; name=&quot;radio&quot;&gt;\n          &lt;Radio&gt;checkbox&lt;/Radio&gt;\n        &lt;/Form.Item&gt;\n        &lt;Form.Item&gt;\n          &lt;Button type=&quot;primary&quot; htmlType=&quot;submit&quot;&gt;\n            Submit\n          &lt;/Button&gt;\n          &lt;Button style={{ marginLeft: 10 }} htmlType=&quot;reset&quot;&gt;\n            Reset\n          &lt;/Button&gt;\n        &lt;/Form.Item&gt;\n      &lt;/Form&gt;\n    );\n  }\n\n  handleSubmit = (event, values, error) =&gt; {\n    event.preventDefault();\n\n    console.log(values, error);\n  };\n}\n\nReactDOM.render(&lt;App /&gt;, mountNode);\n</code></pre>\n",demos:{}}}});
//# sourceMappingURL=87.f050765.js.map