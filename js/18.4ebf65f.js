webpackJsonp([18],{Jywp:function(e,n,t){e.exports={code:'import { Form, Input, Button } from \'dashkit-ui\';\n\nclass App extends React.Component {\n  constructor(props) {\n    super(props);\n  }\n\n  render() {\n    return (\n      <Form onSubmit={this.handleSubmit}>\n        <Form.Item\n          label="Name"\n          name="name"\n          required\n          rule={{ message: \'Please input your name\', trigger: [`blur`, `change`] }}\n        >\n          <Input placeholder="Please input your name" />\n        </Form.Item>\n        <Form.Item\n          label="Email"\n          name="email"\n          required\n          rule={{ message: \'Please input your email\' }}\n        >\n          <Input placeholder="Please input your email" />\n        </Form.Item>\n        <Form.Item>\n          <Button type="primary" htmlType="submit">\n            Submit\n          </Button>\n          <Button style={{ marginLeft: 10 }} htmlType="reset">\n            Reset\n          </Button>\n        </Form.Item>\n      </Form>\n    );\n  }\n\n  handleSubmit = (event, values, error) => {\n    event.preventDefault();\n\n    console.log(values, error);\n  };\n}\n\nReactDOM.render(<App />, mountNode);\n',meta:{order:0,title:{"zh-CN":"基本","en-US":"Basic"},subtitle:{"zh-CN":"<p>基本用法，可以用<code>defaultChecked</code>来定义checkbox默认的值。</p>\n","en-US":"<p>It includes all kinds of input items, such as input, select, radio and checkbox.</p>\n"}},preview:function(){function e(n){return(e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(n)}function n(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function r(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function o(e,n,t){return n&&r(e.prototype,n),t&&r(e,t),e}function a(n,t){return!t||"object"!==e(t)&&"function"!=typeof t?l(n):t}function i(e){return(i=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function l(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function u(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),n&&c(e,n)}function c(e,n){return(c=Object.setPrototypeOf||function(e,n){return e.__proto__=n,e})(e,n)}function m(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var p=t("GiK3"),s=(t("O27J"),t("qMEF")),f=function(e){function t(e){var r;return n(this,t),r=a(this,i(t).call(this,e)),m(l(r),"handleSubmit",function(e,n,t){e.preventDefault(),console.log(n,t)}),r}return u(t,e),o(t,[{key:"render",value:function(){return p.createElement(s.Form,{onSubmit:this.handleSubmit},p.createElement(s.Form.Item,{label:"Name",name:"name",required:!0,rule:{message:"Please input your name",trigger:["blur","change"]}},p.createElement(s.Input,{placeholder:"Please input your name"})),p.createElement(s.Form.Item,{label:"Email",name:"email",required:!0,rule:{message:"Please input your email"}},p.createElement(s.Input,{placeholder:"Please input your email"})),p.createElement(s.Form.Item,null,p.createElement(s.Button,{type:"primary",htmlType:"submit"},"Submit"),p.createElement(s.Button,{style:{marginLeft:10},htmlType:"reset"},"Reset")))}}]),t}(p.Component);return p.createElement(f,null)}}},iZYv:function(e,n,t){e.exports={markdown:'<h1>Form</h1>\n<p>Form is used to collect, validate, and submit the user input, usually contains various form items including checkbox, radio, input, select, and etc.</p>\n<div id="demos"></div>\n<h2>API</h2>\n<div class="api-container">\n<table>\n<thead>\n<tr>\n<th>Property</th>\n<th>Description</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>className</td>\n<td>className of the component</td>\n<td>-</td>\n<td>-</td>\n</tr>\n</tbody>\n</table>\n</div>\n',demos:{alignment:t("nbkw"),basic:t("Jywp")}}},nbkw:function(e,n,t){e.exports={code:'import { Form, Input, Button, Radio } from \'dashkit-ui\';\n\nclass App extends React.Component {\n  constructor(props) {\n    super(props);\n\n    this.state = {\n      align: \'right\',\n    };\n  }\n\n  render() {\n    const { align } = this.state;\n    return (\n      <div>\n        <Radio.Group onChange={this.handleChange} value={align} style={{ marginBottom: 24 }}>\n          <Radio value="left">Left</Radio>\n          <Radio value="right">Right</Radio>\n          <Radio value="top">Top</Radio>\n        </Radio.Group>\n        <Form labelAlign={align}>\n          <Form.Item label="Name" required>\n            <Input placeholder="Please input your name" />\n          </Form.Item>\n          <Form.Item label="Email">\n            <Input placeholder="Please input your email" />\n          </Form.Item>\n        </Form>\n      </div>\n    );\n  }\n\n  handleChange = align => {\n    console.log(`switch to alignment ${align}`);\n    this.setState({ align });\n  };\n}\n\nReactDOM.render(<App />, mountNode);\n',meta:{order:1,title:{"zh-CN":"基本","en-US":"Alignment"},subtitle:{"zh-CN":"<p>根据具体目标和制约因素，选择最佳的标签对齐方式。</p>\n","en-US":"<p>Depending on your design, there are several different ways to align your label element.</p>\n"}},preview:function(){function e(n){return(e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(n)}function n(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function r(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function o(e,n,t){return n&&r(e.prototype,n),t&&r(e,t),e}function a(n,t){return!t||"object"!==e(t)&&"function"!=typeof t?l(n):t}function i(e){return(i=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function l(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function u(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),n&&c(e,n)}function c(e,n){return(c=Object.setPrototypeOf||function(e,n){return e.__proto__=n,e})(e,n)}function m(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var p=t("GiK3"),s=(t("O27J"),t("qMEF")),f=function(e){function t(e){var r;return n(this,t),r=a(this,i(t).call(this,e)),m(l(r),"handleChange",function(e){console.log("switch to alignment ".concat(e)),r.setState({align:e})}),r.state={align:"right"},r}return u(t,e),o(t,[{key:"render",value:function(){var e=this.state.align;return p.createElement("div",null,p.createElement(s.Radio.Group,{onChange:this.handleChange,value:e,style:{marginBottom:24}},p.createElement(s.Radio,{value:"left"},"Left"),p.createElement(s.Radio,{value:"right"},"Right"),p.createElement(s.Radio,{value:"top"},"Top")),p.createElement(s.Form,{labelAlign:e},p.createElement(s.Form.Item,{label:"Name",required:!0},p.createElement(s.Input,{placeholder:"Please input your name"})),p.createElement(s.Form.Item,{label:"Email"},p.createElement(s.Input,{placeholder:"Please input your email"}))))}}]),t}(p.Component);return p.createElement(f,null)}}}});
//# sourceMappingURL=18.4ebf65f.js.map