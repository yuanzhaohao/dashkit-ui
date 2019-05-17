webpackJsonp([4,30,31,32,33],{"6NV5":function(t,e,o){t.exports={code:'import { Tooltip, Button } from \'dashkit-ui\';\n\nReactDOM.render(\n  <div>\n    <Tooltip content="hover event">\n      <Button type="primary">Hover me</Button>\n    </Tooltip>\n    <Tooltip content="click event" trigger="click">\n      <Button style={{marginLeft: 10}} type="primary">Click me</Button>\n    </Tooltip>\n    <Tooltip content="focus event" trigger="focus">\n      <Button style={{marginLeft: 10}} type="primary">Focus me</Button>\n    </Tooltip>\n  </div>,\n  mountNode\n);\n',meta:{order:3,title:{"zh-CN":"基本","en-US":"Basic"},subtitle:{"zh-CN":"<p>基本的使用。</p>\n","en-US":"<p>The most basic usage.</p>\n"},__content:""},preview:function(){var t=o("GiK3"),e=(o("O27J"),o("qMEF"));return t.createElement("div",null,t.createElement(e.Tooltip,{content:"hover event"},t.createElement(e.Button,{type:"primary"},"Hover me")),t.createElement(e.Tooltip,{content:"click event",trigger:"click"},t.createElement(e.Button,{style:{marginLeft:10},type:"primary"},"Click me")),t.createElement(e.Tooltip,{content:"focus event",trigger:"focus"},t.createElement(e.Button,{style:{marginLeft:10},type:"primary"},"Focus me")))}}},JPRA:function(t,e,o){t.exports={markdown:"<h1>Tooltip</h1>\n<p>A simple text popup tip.</p>\n<div id=\"demos\"></div>\n<h2>API</h2>\n<table>\n<thead>\n<tr>\n<th>Property</th>\n<th>Description</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>className</td>\n<td>className of the component</td>\n<td><code>string</code></td>\n<td>-</td>\n</tr>\n<tr>\n<td>placement</td>\n<td>position of tooltip</td>\n<td><code>'top-start' | 'top' | 'top-end' | 'right-start' | 'right' | 'right-end' | 'bottom-start' | 'bottom' | 'bottom-end' | 'left-start' | 'left' | 'left-end'</code></td>\n<td>top</td>\n</tr>\n<tr>\n<td>trigger</td>\n<td>event to trigger the tooltip</td>\n<td><code>'hover' | 'click' | 'focus'</code></td>\n<td>hover</td>\n</tr>\n<tr>\n<td>visible</td>\n<td>determine the tooltip is active</td>\n<td><code>string</code></td>\n<td>false</td>\n</tr>\n<tr>\n<td>content</td>\n<td>content of the component</td>\n<td><code>string</code></td>\n<td>-</td>\n</tr>\n</tbody>\n</table>\n",demos:{basic:o("vXzO"),disabled:o("XK5/"),placement:o("SbIT"),trigger:o("6NV5")}}},SbIT:function(t,e,o){t.exports={code:'import { Tooltip, Button } from \'dashkit-ui\';\n\nReactDOM.render(\n  <div className="tooltip-box">\n    <div className="tooltip-box-top">\n      <Tooltip content="Top Left tooltip prompt text" placement="top-start">\n        <Button className="tooltip-button">top-start</Button>\n      </Tooltip>\n      <Tooltip content="Top Center tooltip prompt text" placement="top">\n        <Button className="tooltip-button">top</Button>\n      </Tooltip>\n      <Tooltip content="Top Right tooltip prompt text" placement="top-end">\n        <Button className="tooltip-button">top-end</Button>\n      </Tooltip>\n    </div>\n    <div className="tooltip-box-left">\n      <Tooltip content="Left Top tooltip prompt text" placement="left-start">\n        <Button className="tooltip-button">left-start</Button>\n      </Tooltip>\n      <Tooltip content="Left Center tooltip prompt text" placement="left">\n        <Button className="tooltip-button">left</Button>\n      </Tooltip>\n      <Tooltip content="Left Bottom tooltip prompt text" placement="left-end">\n        <Button className="tooltip-button">left-end</Button>\n      </Tooltip>\n    </div>\n    <div className="tooltip-box-right">\n      <Tooltip content="Right Top tooltip prompt text" placement="right-start">\n        <Button className="tooltip-button">right-start</Button>\n      </Tooltip>\n      <Tooltip content="Right Center tooltip prompt text" placement="right">\n        <Button className="tooltip-button">right</Button>\n      </Tooltip>\n      <Tooltip content="Right Bottom tooltip prompt text" placement="right-end">\n        <Button className="tooltip-button">right-end</Button>\n      </Tooltip>\n    </div>\n    <div className="tooltip-box-bottom">\n      <Tooltip content="Bottom Left tooltip prompt text" placement="bottom-start">\n        <Button className="tooltip-button">bottom-start</Button>\n      </Tooltip>\n      <Tooltip content="Bottom Center tooltip prompt text" placement="bottom">\n        <Button className="tooltip-button">bottom</Button>\n      </Tooltip>\n      <Tooltip content="Bottom Right tooltip prompt text" placement="bottom-end">\n        <Button className="tooltip-button">bottom-end</Button>\n      </Tooltip>\n    </div>\n  </div>,\n  mountNode\n);\n',meta:{order:1,title:{"zh-CN":"位置","en-US":"Placement"},subtitle:{"zh-CN":"<p>位置</p>\n","en-US":"<p>The attribute <code>placement</code> determines the position of the tooltip. Its value is <code>[orientation]-[alignment]</code> with four orientations <code>top</code>, <code>left</code>, <code>right</code>, <code>bottom</code> and three alignments <code>start</code>, <code>end</code>, <code>null</code>, and the default alignment is null.</p>\n"},__content:""},preview:function(){var t=o("GiK3"),e=(o("O27J"),o("qMEF"));return t.createElement("div",{className:"tooltip-box"},t.createElement("div",{className:"tooltip-box-top"},t.createElement(e.Tooltip,{content:"Top Left tooltip prompt text",placement:"top-start"},t.createElement(e.Button,{className:"tooltip-button"},"top-start")),t.createElement(e.Tooltip,{content:"Top Center tooltip prompt text",placement:"top"},t.createElement(e.Button,{className:"tooltip-button"},"top")),t.createElement(e.Tooltip,{content:"Top Right tooltip prompt text",placement:"top-end"},t.createElement(e.Button,{className:"tooltip-button"},"top-end"))),t.createElement("div",{className:"tooltip-box-left"},t.createElement(e.Tooltip,{content:"Left Top tooltip prompt text",placement:"left-start"},t.createElement(e.Button,{className:"tooltip-button"},"left-start")),t.createElement(e.Tooltip,{content:"Left Center tooltip prompt text",placement:"left"},t.createElement(e.Button,{className:"tooltip-button"},"left")),t.createElement(e.Tooltip,{content:"Left Bottom tooltip prompt text",placement:"left-end"},t.createElement(e.Button,{className:"tooltip-button"},"left-end"))),t.createElement("div",{className:"tooltip-box-right"},t.createElement(e.Tooltip,{content:"Right Top tooltip prompt text",placement:"right-start"},t.createElement(e.Button,{className:"tooltip-button"},"right-start")),t.createElement(e.Tooltip,{content:"Right Center tooltip prompt text",placement:"right"},t.createElement(e.Button,{className:"tooltip-button"},"right")),t.createElement(e.Tooltip,{content:"Right Bottom tooltip prompt text",placement:"right-end"},t.createElement(e.Button,{className:"tooltip-button"},"right-end"))),t.createElement("div",{className:"tooltip-box-bottom"},t.createElement(e.Tooltip,{content:"Bottom Left tooltip prompt text",placement:"bottom-start"},t.createElement(e.Button,{className:"tooltip-button"},"bottom-start")),t.createElement(e.Tooltip,{content:"Bottom Center tooltip prompt text",placement:"bottom"},t.createElement(e.Button,{className:"tooltip-button"},"bottom")),t.createElement(e.Tooltip,{content:"Bottom Right tooltip prompt text",placement:"bottom-end"},t.createElement(e.Button,{className:"tooltip-button"},"bottom-end"))))}}},"XK5/":function(t,e,o){t.exports={code:"import { Tooltip, Button } from 'dashkit-ui';\n\nclass Demo extends React.Component {\n  constructor(props){\n    super(props);\n\n    this.state = {\n      disabled: false\n    }\n  }\n\n  render() {\n    const { disabled } = this.state;\n\n    return (\n      <Tooltip content=\"prompt text\" disabled={disabled}>\n        <Button onClick={this.handleClick}>\n          click to {disabled ? 'active' : 'close'} tooltip function\n        </Button>\n      </Tooltip>\n    );\n  }\n\n  handleClick = () => {\n    const { disabled } = this.state;\n\n    this.setState({\n      disabled: !disabled,\n    });\n  }\n}\n\nReactDOM.render(\n  <Demo />,\n  mountNode\n);\n",meta:{order:2,title:{"zh-CN":"禁用","en-US":"Disabled"},subtitle:{"zh-CN":"<p>基本的使用。</p>\n","en-US":"<p>Disabled usage.</p>\n"},__content:""},preview:function(){function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function e(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function n(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var l=o("GiK3"),i=(o("O27J"),function(){function t(t,e){for(var o=0;o<e.length;o++){var n=e[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,o,n){return o&&t(e.prototype,o),n&&t(e,n),e}}()),p=o("qMEF"),r=function(o){function r(o){t(this,r);var n=e(this,(r.__proto__||Object.getPrototypeOf(r)).call(this,o));return n.handleClick=function(){var t=n.state.disabled;n.setState({disabled:!t})},n.state={disabled:!1},n}return n(r,o),i(r,[{key:"render",value:function(){var t=this.state.disabled;return l.createElement(p.Tooltip,{content:"prompt text",disabled:t},l.createElement(p.Button,{onClick:this.handleClick},"click to ",t?"active":"close"," tooltip function"))}}]),r}(l.Component);return l.createElement(r,null)}}},vXzO:function(t,e,o){t.exports={code:"import { Tooltip } from 'dashkit-ui';\n\nReactDOM.render(\n  <Tooltip content=\"prompt text\">\n    <span>Tooltip will show when mouse enter.</span>\n  </Tooltip>,\n  mountNode\n);\n",meta:{order:0,title:{"zh-CN":"基本","en-US":"Basic"},subtitle:{"zh-CN":"<p>基本的使用。</p>\n","en-US":"<p>The most basic usage.</p>\n"},__content:""},preview:function(){var t=o("GiK3"),e=(o("O27J"),o("qMEF"));return t.createElement(e.Tooltip,{content:"prompt text"},t.createElement("span",null,"Tooltip will show when mouse enter."))}}}});
//# sourceMappingURL=4.68df477.js.map