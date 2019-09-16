webpackJsonp([5],{"C8E/":function(e,n,t){e.exports={code:'import { Form, Input, Button, Modal } from \'dashkit-ui\';\n\nclass App extends React.Component {\n  state = {\n    visible: false,\n  };\n  render() {\n    return (\n      <div>\n        <Button type="primary" onClick={this.showModal}>\n          Open a Modal\n        </Button>\n        <Modal\n          visible={this.state.visible}\n          onClose={this.handleCancel}\n          showFooter={false}\n          title="Request an Invite"\n        >\n          <Form onSubmit={this.handleSubmit} labelWidth={150}>\n            <Form.Item\n              label="Full Name"\n              name="name"\n              required\n              rule={{\n                message: \'Please input your name\',\n                trigger: [`blur`, `change`],\n                validator: this.handleNameValidator,\n              }}\n            >\n              <Input placeholder="Full name" />\n            </Form.Item>\n            <Form.Item\n              label="Email"\n              name="email"\n              required\n              rule={{ message: \'Please input your email\' }}\n            >\n              <Input placeholder="Email" />\n            </Form.Item>\n            <Form.Item\n              label="Confirm Email"\n              name="confirmEmail"\n              required\n              rule={{\n                message: \'Please input your email\',\n                trigger: [`focus`, `change`],\n                validator: this.handleValidator,\n              }}\n            >\n              <Input placeholder="Confirm email" />\n            </Form.Item>\n            <Form.Item>\n              <Button type="primary" htmlType="submit">\n                Submit\n              </Button>\n              <Button style={{ marginLeft: 10 }} htmlType="reset">\n                Reset\n              </Button>\n            </Form.Item>\n          </Form>\n        </Modal>\n      </div>\n    );\n  }\n\n  handleSubmit = (event, values, error) => {\n    event.preventDefault();\n\n    console.log(values, error);\n  };\n\n  handleValidator = (forms, value, callback) => {\n    if (value !== forms.email) {\n      callback("Two inputs don\'t match!");\n    }\n  };\n\n  handleNameValidator = (forms, value, callback) => {\n    console.log(forms.name);\n    if (forms.name && forms.name.length < 3) {\n      callback(\'Full name needs to be at least 3 characters long\');\n    }\n  };\n\n  showModal = () => {\n    this.setState({ visible: true });\n  };\n\n  handleCancel = () => {\n    this.setState({ visible: false });\n  };\n}\n\nReactDOM.render(<App />, mountNode);\n',meta:{order:4,title:{"zh-CN":"和Modal一起使用","en-US":"Use with Modal"},subtitle:{"zh-CN":"<p>和Modal一起使用</p>\n","en-US":"<p>Use with Modal.</p>\n"}},preview:function(){function e(n){return(e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(n)}function n(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function o(e,n){for(var t=0;t<n.length;t++){var o=n[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function r(e,n,t){return n&&o(e.prototype,n),t&&o(e,t),e}function a(n,t){return!t||"object"!==e(t)&&"function"!=typeof t?i(n):t}function l(e){return(l=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function i(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function m(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),n&&u(e,n)}function u(e,n){return(u=Object.setPrototypeOf||function(e,n){return e.__proto__=n,e})(e,n)}function c(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var s=t("GiK3"),p=(t("O27J"),t("qMEF")),d=function(e){function t(){var e,o;n(this,t);for(var r=arguments.length,m=new Array(r),u=0;u<r;u++)m[u]=arguments[u];return o=a(this,(e=l(t)).call.apply(e,[this].concat(m))),c(i(o),"state",{visible:!1}),c(i(o),"handleSubmit",function(e,n,t){e.preventDefault(),console.log(n,t)}),c(i(o),"handleValidator",function(e,n,t){n!==e.email&&t("Two inputs don't match!")}),c(i(o),"handleNameValidator",function(e,n,t){console.log(e.name),e.name&&e.name.length<3&&t("Full name needs to be at least 3 characters long")}),c(i(o),"showModal",function(){o.setState({visible:!0})}),c(i(o),"handleCancel",function(){o.setState({visible:!1})}),o}return m(t,e),r(t,[{key:"render",value:function(){return s.createElement("div",null,s.createElement(p.Button,{type:"primary",onClick:this.showModal},"Open a Modal"),s.createElement(p.Modal,{visible:this.state.visible,onClose:this.handleCancel,showFooter:!1,title:"Request an Invite"},s.createElement(p.Form,{onSubmit:this.handleSubmit,labelWidth:150},s.createElement(p.Form.Item,{label:"Full Name",name:"name",required:!0,rule:{message:"Please input your name",trigger:["blur","change"],validator:this.handleNameValidator}},s.createElement(p.Input,{placeholder:"Full name"})),s.createElement(p.Form.Item,{label:"Email",name:"email",required:!0,rule:{message:"Please input your email"}},s.createElement(p.Input,{placeholder:"Email"})),s.createElement(p.Form.Item,{label:"Confirm Email",name:"confirmEmail",required:!0,rule:{message:"Please input your email",trigger:["focus","change"],validator:this.handleValidator}},s.createElement(p.Input,{placeholder:"Confirm email"})),s.createElement(p.Form.Item,null,s.createElement(p.Button,{type:"primary",htmlType:"submit"},"Submit"),s.createElement(p.Button,{style:{marginLeft:10},htmlType:"reset"},"Reset")))))}}]),t}(s.Component);return s.createElement(d,null)}}},J6ME:function(e,n,t){e.exports={code:'import { Form, Input, Button, Select, Calendar, Switch, Checkbox, Radio } from \'dashkit-ui\';\n\nconst cityOptions = [\'Shanghai\', \'Beijing\', \'Guangzhou\', \'Shenzhen\'];\n\nclass App extends React.Component {\n  render() {\n    return (\n      <Form onSubmit={this.handleSubmit} labelWidth={150}>\n        <Form.Item\n          label="Name"\n          name="name"\n          required\n          rule={{ message: \'Please input your name\', trigger: [`blur`, `change`] }}\n        >\n          <Input placeholder="Please input your name" />\n        </Form.Item>\n        <Form.Item\n          label="Email"\n          name="email"\n          required\n          rule={{ message: \'Please input your email\' }}\n        >\n          <Input placeholder="Please input your email" />\n        </Form.Item>\n        <Form.Item label="Zone" name="zone" required rule={{ message: \'Please select your zone\' }}>\n          <Select placeholder="Please select your zone">\n            <Select.Option value="zone1">Zone 1</Select.Option>\n            <Select.Option value="zone2">Zone 2</Select.Option>\n          </Select>\n        </Form.Item>\n        <Form.Item\n          label="Range Time"\n          name="rangTime"\n          required\n          rule={{ message: \'Please select rang time\' }}\n        >\n          <Calendar type="datetime" range />\n        </Form.Item>\n        <Form.Item label="Switch" name="switch">\n          <Switch />\n        </Form.Item>\n        <Form.Item\n          required\n          label="CheckboxGroup"\n          name="checkboxGroup"\n          rule={{ message: \'Please select your city\' }}\n        >\n          <Checkbox.Group options={cityOptions}>\n            {cityOptions.map((city, index) => (\n              <Checkbox key={index} value={city}>\n                {city}\n              </Checkbox>\n            ))}\n          </Checkbox.Group>\n        </Form.Item>\n        <Form.Item label="Checkbox" name="checkbox">\n          <Checkbox>checkbox</Checkbox>\n        </Form.Item>\n        <Form.Item\n          required\n          label="RadioGroup"\n          name="radioGroup"\n          rule={{ message: \'Please select your radio\' }}\n        >\n          <Radio.Group>\n            <Radio value={1}>A</Radio>\n            <Radio value={2}>B</Radio>\n            <Radio value={3}>C</Radio>\n            <Radio value={4}>D</Radio>\n          </Radio.Group>\n        </Form.Item>\n        <Form.Item label="Radio" name="radio">\n          <Radio>checkbox</Radio>\n        </Form.Item>\n        <Form.Item>\n          <Button type="primary" htmlType="submit">\n            Submit\n          </Button>\n          <Button style={{ marginLeft: 10 }} htmlType="reset">\n            Reset\n          </Button>\n        </Form.Item>\n      </Form>\n    );\n  }\n\n  handleSubmit = (event, values, error) => {\n    event.preventDefault();\n\n    console.log(values, error);\n  };\n}\n\nReactDOM.render(<App />, mountNode);\n',meta:{order:2,title:{"zh-CN":"校验","en-US":"Validation"},subtitle:{"zh-CN":"<p>校验，可以用<code>rule</code>来定义校验规则。</p>\n","en-US":"<p>Form component allows you to verify your data, helping you find and correct errors.</p>\n"}},preview:function(){function e(n){return(e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(n)}function n(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function o(e,n){for(var t=0;t<n.length;t++){var o=n[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function r(e,n,t){return n&&o(e.prototype,n),t&&o(e,t),e}function a(n,t){return!t||"object"!==e(t)&&"function"!=typeof t?i(n):t}function l(e){return(l=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function i(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function m(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),n&&u(e,n)}function u(e,n){return(u=Object.setPrototypeOf||function(e,n){return e.__proto__=n,e})(e,n)}function c(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var s=t("GiK3"),p=(t("O27J"),t("qMEF")),d=["Shanghai","Beijing","Guangzhou","Shenzhen"],h=function(e){function t(){var e,o;n(this,t);for(var r=arguments.length,m=new Array(r),u=0;u<r;u++)m[u]=arguments[u];return o=a(this,(e=l(t)).call.apply(e,[this].concat(m))),c(i(o),"handleSubmit",function(e,n,t){e.preventDefault(),console.log(n,t)}),o}return m(t,e),r(t,[{key:"render",value:function(){return s.createElement(p.Form,{onSubmit:this.handleSubmit,labelWidth:150},s.createElement(p.Form.Item,{label:"Name",name:"name",required:!0,rule:{message:"Please input your name",trigger:["blur","change"]}},s.createElement(p.Input,{placeholder:"Please input your name"})),s.createElement(p.Form.Item,{label:"Email",name:"email",required:!0,rule:{message:"Please input your email"}},s.createElement(p.Input,{placeholder:"Please input your email"})),s.createElement(p.Form.Item,{label:"Zone",name:"zone",required:!0,rule:{message:"Please select your zone"}},s.createElement(p.Select,{placeholder:"Please select your zone"},s.createElement(p.Select.Option,{value:"zone1"},"Zone 1"),s.createElement(p.Select.Option,{value:"zone2"},"Zone 2"))),s.createElement(p.Form.Item,{label:"Range Time",name:"rangTime",required:!0,rule:{message:"Please select rang time"}},s.createElement(p.Calendar,{type:"datetime",range:!0})),s.createElement(p.Form.Item,{label:"Switch",name:"switch"},s.createElement(p.Switch,null)),s.createElement(p.Form.Item,{required:!0,label:"CheckboxGroup",name:"checkboxGroup",rule:{message:"Please select your city"}},s.createElement(p.Checkbox.Group,{options:d},d.map(function(e,n){return s.createElement(p.Checkbox,{key:n,value:e},e)}))),s.createElement(p.Form.Item,{label:"Checkbox",name:"checkbox"},s.createElement(p.Checkbox,null,"checkbox")),s.createElement(p.Form.Item,{required:!0,label:"RadioGroup",name:"radioGroup",rule:{message:"Please select your radio"}},s.createElement(p.Radio.Group,null,s.createElement(p.Radio,{value:1},"A"),s.createElement(p.Radio,{value:2},"B"),s.createElement(p.Radio,{value:3},"C"),s.createElement(p.Radio,{value:4},"D"))),s.createElement(p.Form.Item,{label:"Radio",name:"radio"},s.createElement(p.Radio,null,"checkbox")),s.createElement(p.Form.Item,null,s.createElement(p.Button,{type:"primary",htmlType:"submit"},"Submit"),s.createElement(p.Button,{style:{marginLeft:10},htmlType:"reset"},"Reset")))}}]),t}(s.Component);return s.createElement(h,null)}}},Jywp:function(e,n,t){e.exports={code:'import { Form, Input, Button, Select, Calendar, Switch, Checkbox, Radio } from \'dashkit-ui\';\n\nconst cityOptions = [\'Shanghai\', \'Beijing\', \'Guangzhou\', \'Shenzhen\'];\n\nclass App extends React.Component {\n  render() {\n    return (\n      <Form onSubmit={this.handleSubmit} labelWidth={150}>\n        <Form.Item label="Name" name="name">\n          <Input placeholder="Please input your name" />\n        </Form.Item>\n        <Form.Item label="Email" name="email">\n          <Input placeholder="Please input your email" />\n        </Form.Item>\n        <Form.Item label="Zone" name="zone">\n          <Select placeholder="Please select your zone">\n            <Select.Option value="zone1">Zone 1</Select.Option>\n            <Select.Option value="zone2">Zone 2</Select.Option>\n          </Select>\n        </Form.Item>\n        <Form.Item label="Date" name="date">\n          <Calendar />\n        </Form.Item>\n        <Form.Item label="Range Time" name="rangTime">\n          <Calendar type="datetime" range />\n        </Form.Item>\n        <Form.Item label="Switch" name="switch">\n          <Switch />\n        </Form.Item>\n        <Form.Item label="CheckboxGroup" name="checkboxGroup">\n          <Checkbox.Group options={cityOptions}>\n            {cityOptions.map((city, index) => (\n              <Checkbox key={index} value={city}>\n                {city}\n              </Checkbox>\n            ))}\n          </Checkbox.Group>\n        </Form.Item>\n        <Form.Item label="Checkbox" name="checkbox">\n          <Checkbox>checkbox</Checkbox>\n        </Form.Item>\n        <Form.Item label="RadioGroup" name="radioGroup">\n          <Radio.Group>\n            <Radio value={1}>A</Radio>\n            <Radio value={2}>B</Radio>\n            <Radio value={3}>C</Radio>\n            <Radio value={4}>D</Radio>\n          </Radio.Group>\n        </Form.Item>\n        <Form.Item label="Radio" name="radio">\n          <Radio>checkbox</Radio>\n        </Form.Item>\n        <Form.Item>\n          <Button type="primary" htmlType="submit">\n            Submit\n          </Button>\n          <Button style={{ marginLeft: 10 }} htmlType="reset">\n            Reset\n          </Button>\n        </Form.Item>\n      </Form>\n    );\n  }\n\n  handleSubmit = (event, values, error) => {\n    event.preventDefault();\n\n    console.log(values, error);\n  };\n}\n\nReactDOM.render(<App />, mountNode);\n',meta:{order:0,title:{"zh-CN":"基本","en-US":"Basic"},subtitle:{"zh-CN":"<p>基本用法，可以用<code>defaultChecked</code>来定义checkbox默认的值。</p>\n","en-US":"<p>It includes all kinds of input items, such as input, select, radio and checkbox.</p>\n"}},preview:function(){function e(n){return(e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(n)}function n(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function o(e,n){for(var t=0;t<n.length;t++){var o=n[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function r(e,n,t){return n&&o(e.prototype,n),t&&o(e,t),e}function a(n,t){return!t||"object"!==e(t)&&"function"!=typeof t?i(n):t}function l(e){return(l=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function i(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function m(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),n&&u(e,n)}function u(e,n){return(u=Object.setPrototypeOf||function(e,n){return e.__proto__=n,e})(e,n)}function c(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var s=t("GiK3"),p=(t("O27J"),t("qMEF")),d=["Shanghai","Beijing","Guangzhou","Shenzhen"],h=function(e){function t(){var e,o;n(this,t);for(var r=arguments.length,m=new Array(r),u=0;u<r;u++)m[u]=arguments[u];return o=a(this,(e=l(t)).call.apply(e,[this].concat(m))),c(i(o),"handleSubmit",function(e,n,t){e.preventDefault(),console.log(n,t)}),o}return m(t,e),r(t,[{key:"render",value:function(){return s.createElement(p.Form,{onSubmit:this.handleSubmit,labelWidth:150},s.createElement(p.Form.Item,{label:"Name",name:"name"},s.createElement(p.Input,{placeholder:"Please input your name"})),s.createElement(p.Form.Item,{label:"Email",name:"email"},s.createElement(p.Input,{placeholder:"Please input your email"})),s.createElement(p.Form.Item,{label:"Zone",name:"zone"},s.createElement(p.Select,{placeholder:"Please select your zone"},s.createElement(p.Select.Option,{value:"zone1"},"Zone 1"),s.createElement(p.Select.Option,{value:"zone2"},"Zone 2"))),s.createElement(p.Form.Item,{label:"Date",name:"date"},s.createElement(p.Calendar,null)),s.createElement(p.Form.Item,{label:"Range Time",name:"rangTime"},s.createElement(p.Calendar,{type:"datetime",range:!0})),s.createElement(p.Form.Item,{label:"Switch",name:"switch"},s.createElement(p.Switch,null)),s.createElement(p.Form.Item,{label:"CheckboxGroup",name:"checkboxGroup"},s.createElement(p.Checkbox.Group,{options:d},d.map(function(e,n){return s.createElement(p.Checkbox,{key:n,value:e},e)}))),s.createElement(p.Form.Item,{label:"Checkbox",name:"checkbox"},s.createElement(p.Checkbox,null,"checkbox")),s.createElement(p.Form.Item,{label:"RadioGroup",name:"radioGroup"},s.createElement(p.Radio.Group,null,s.createElement(p.Radio,{value:1},"A"),s.createElement(p.Radio,{value:2},"B"),s.createElement(p.Radio,{value:3},"C"),s.createElement(p.Radio,{value:4},"D"))),s.createElement(p.Form.Item,{label:"Radio",name:"radio"},s.createElement(p.Radio,null,"checkbox")),s.createElement(p.Form.Item,null,s.createElement(p.Button,{type:"primary",htmlType:"submit"},"Submit"),s.createElement(p.Button,{style:{marginLeft:10},htmlType:"reset"},"Reset")))}}]),t}(s.Component);return s.createElement(h,null)}}},iZYv:function(e,n,t){e.exports={markdown:'<h1>Form</h1>\n<p>Form is used to collect, validate, and submit the user input, usually contains various form items including checkbox, radio, input, select, and etc.</p>\n<div id="demos"></div>\n<h2>API</h2>\n<div class="api-container">\n<table>\n<thead>\n<tr>\n<th>Property</th>\n<th>Description</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>className</td>\n<td>className of the component</td>\n<td>-</td>\n<td>-</td>\n</tr>\n</tbody>\n</table>\n</div>\n',demos:{alignment:t("nbkw"),basic:t("Jywp"),"custom-validation":t("oWr9"),modal:t("C8E/"),validation:t("J6ME")}}},nbkw:function(e,n,t){e.exports={code:'import { Form, Input, Button, Radio } from \'dashkit-ui\';\n\nclass App extends React.Component {\n  constructor(props) {\n    super(props);\n\n    this.state = {\n      align: \'right\',\n    };\n  }\n\n  render() {\n    const { align } = this.state;\n    return (\n      <div>\n        <Radio.Group onChange={this.handleChange} value={align} style={{ marginBottom: 24 }}>\n          <Radio value="left">Left</Radio>\n          <Radio value="right">Right</Radio>\n          <Radio value="top">Top</Radio>\n        </Radio.Group>\n        <Form labelAlign={align}>\n          <Form.Item label="Name" name="name" required>\n            <Input placeholder="Please input your name" />\n          </Form.Item>\n          <Form.Item label="Email" name="email">\n            <Input placeholder="Please input your email" />\n          </Form.Item>\n        </Form>\n      </div>\n    );\n  }\n\n  handleChange = align => {\n    console.log(`switch to alignment ${align}`);\n    this.setState({ align });\n  };\n}\n\nReactDOM.render(<App />, mountNode);\n',meta:{order:1,title:{"zh-CN":"基本","en-US":"Alignment"},subtitle:{"zh-CN":"<p>根据具体目标和制约因素，选择最佳的标签对齐方式。</p>\n","en-US":"<p>Depending on your design, there are several different ways to align your label element.</p>\n"}},preview:function(){function e(n){return(e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(n)}function n(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function o(e,n){for(var t=0;t<n.length;t++){var o=n[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function r(e,n,t){return n&&o(e.prototype,n),t&&o(e,t),e}function a(n,t){return!t||"object"!==e(t)&&"function"!=typeof t?i(n):t}function l(e){return(l=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function i(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function m(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),n&&u(e,n)}function u(e,n){return(u=Object.setPrototypeOf||function(e,n){return e.__proto__=n,e})(e,n)}function c(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var s=t("GiK3"),p=(t("O27J"),t("qMEF")),d=function(e){function t(e){var o;return n(this,t),o=a(this,l(t).call(this,e)),c(i(o),"handleChange",function(e){console.log("switch to alignment ".concat(e)),o.setState({align:e})}),o.state={align:"right"},o}return m(t,e),r(t,[{key:"render",value:function(){var e=this.state.align;return s.createElement("div",null,s.createElement(p.Radio.Group,{onChange:this.handleChange,value:e,style:{marginBottom:24}},s.createElement(p.Radio,{value:"left"},"Left"),s.createElement(p.Radio,{value:"right"},"Right"),s.createElement(p.Radio,{value:"top"},"Top")),s.createElement(p.Form,{labelAlign:e},s.createElement(p.Form.Item,{label:"Name",name:"name",required:!0},s.createElement(p.Input,{placeholder:"Please input your name"})),s.createElement(p.Form.Item,{label:"Email",name:"email"},s.createElement(p.Input,{placeholder:"Please input your email"}))))}}]),t}(s.Component);return s.createElement(d,null)}}},oWr9:function(e,n,t){e.exports={code:'import {\n  Form,\n  Input,\n  Button,\n  Select,\n  Calendar,\n  Switch,\n  Checkbox,\n  Radio,\n  Message,\n} from \'dashkit-ui\';\n\nclass App extends React.Component {\n  render() {\n    return (\n      <Form onSubmit={this.handleSubmit} labelWidth={150}>\n        <Form.Item\n          label="Full Name"\n          name="name"\n          required\n          rule={{\n            message: \'Please input your name\',\n            trigger: [`blur`, `change`],\n            validator: this.handleNameValidator,\n          }}\n        >\n          <Input placeholder="Full name" />\n        </Form.Item>\n        <Form.Item\n          label="Email"\n          name="email"\n          required\n          rule={{\n            message: \'Please input your email\',\n            validator: this.handleEmailValidator,\n          }}\n        >\n          <Input placeholder="Email" />\n        </Form.Item>\n        <Form.Item\n          label="Confirm Email"\n          name="confirmEmail"\n          required\n          rule={{\n            message: \'Please input your email\',\n            trigger: [`focus`, `change`],\n            validator: this.handleConfirmValidator,\n          }}\n        >\n          <Input placeholder="Confirm email" />\n        </Form.Item>\n        <Form.Item>\n          <Button type="primary" htmlType="submit">\n            Submit\n          </Button>\n          <Button style={{ marginLeft: 10 }} htmlType="reset">\n            Reset\n          </Button>\n        </Form.Item>\n      </Form>\n    );\n  }\n\n  handleSubmit = (event, values, errors, forms) => {\n    event.preventDefault();\n\n    if (!errors) {\n      console.log(values);\n      setTimeout(() => {\n        Message.success(\'Success\');\n        forms.reset();\n      }, 2000);\n    }\n  };\n\n  handleEmailValidator = (forms, value, callback) => {\n    const reg = /^[a-z0-9]+([._\\\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;\n\n    if (value && !reg.test(value)) {\n      callback(\'Email needs to be in validation email format!\');\n    }\n  };\n\n  handleConfirmValidator = (forms, value, callback) => {\n    if (value !== forms.email) {\n      callback("Two inputs don\'t match!");\n    }\n  };\n\n  handleNameValidator = (forms, value, callback) => {\n    if (value && value.length < 3) {\n      callback(\'Full name needs to be at least 3 characters long\');\n    }\n  };\n}\n\nReactDOM.render(<App />, mountNode);\n',meta:{order:3,title:{"zh-CN":"自定义校验规则","en-US":"Custom validation rules"},subtitle:{"zh-CN":"<p>自定义校验规则</p>\n","en-US":"<p>Custom validation rules.</p>\n"}},preview:function(){function e(n){return(e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(n)}function n(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function o(e,n){for(var t=0;t<n.length;t++){var o=n[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function r(e,n,t){return n&&o(e.prototype,n),t&&o(e,t),e}function a(n,t){return!t||"object"!==e(t)&&"function"!=typeof t?i(n):t}function l(e){return(l=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function i(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function m(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),n&&u(e,n)}function u(e,n){return(u=Object.setPrototypeOf||function(e,n){return e.__proto__=n,e})(e,n)}function c(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var s=t("GiK3"),p=(t("O27J"),t("qMEF")),d=function(e){function t(){var e,o;n(this,t);for(var r=arguments.length,m=new Array(r),u=0;u<r;u++)m[u]=arguments[u];return o=a(this,(e=l(t)).call.apply(e,[this].concat(m))),c(i(o),"handleSubmit",function(e,n,t,o){e.preventDefault(),t||(console.log(n),setTimeout(function(){p.Message.success("Success"),o.reset()},2e3))}),c(i(o),"handleEmailValidator",function(e,n,t){var o=/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;n&&!o.test(n)&&t("Email needs to be in validation email format!")}),c(i(o),"handleConfirmValidator",function(e,n,t){n!==e.email&&t("Two inputs don't match!")}),c(i(o),"handleNameValidator",function(e,n,t){n&&n.length<3&&t("Full name needs to be at least 3 characters long")}),o}return m(t,e),r(t,[{key:"render",value:function(){return s.createElement(p.Form,{onSubmit:this.handleSubmit,labelWidth:150},s.createElement(p.Form.Item,{label:"Full Name",name:"name",required:!0,rule:{message:"Please input your name",trigger:["blur","change"],validator:this.handleNameValidator}},s.createElement(p.Input,{placeholder:"Full name"})),s.createElement(p.Form.Item,{label:"Email",name:"email",required:!0,rule:{message:"Please input your email",validator:this.handleEmailValidator}},s.createElement(p.Input,{placeholder:"Email"})),s.createElement(p.Form.Item,{label:"Confirm Email",name:"confirmEmail",required:!0,rule:{message:"Please input your email",trigger:["focus","change"],validator:this.handleConfirmValidator}},s.createElement(p.Input,{placeholder:"Confirm email"})),s.createElement(p.Form.Item,null,s.createElement(p.Button,{type:"primary",htmlType:"submit"},"Submit"),s.createElement(p.Button,{style:{marginLeft:10},htmlType:"reset"},"Reset")))}}]),t}(s.Component);return s.createElement(d,null)}}}});
//# sourceMappingURL=5.c065de6.js.map