webpackJsonp([38],{e2Vx:function(e,n,t){e.exports={code:"import { Select } from 'dashkit-ui';\nconst { Option, OptionGroup } = Select;\nconst data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet', 'red1', 'orange1', 'yellow1', 'green1', 'cyan1', 'blue1', 'violet1'];\nconst stations = {\n  'Circle Line': ['Buona Vista', 'Kent Ridge', 'Bishan', 'Dhoby Ghaut'],\n  'East West Line': ['Chinese Garden', 'Jurong East'],\n};\n\nfunction onChange(value) {\n  console.log(`value: ${value}`);\n}\n\nfunction filterOption(inputValue, itemValue) {\n  return itemValue.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1;\n}\nconst Demo = () => (\n  <div>\n    <Select onChange={onChange}>\n      {data.map(color =>\n        <Option key={color} value={color} filterOption={filterOption}>{color}</Option>\n      )}\n      <Option value=\"disabled\" disabled filterOption={filterOption}>disabled</Option>\n    </Select>\n    <Select onChange={onChange} style={{ marginLeft: 10 }}>\n      {Object.keys(stations).map(key =>\n        <OptionGroup key={key} label={key}>\n          {stations[key].map(station =>\n            <Option key={station} value={station} filterOption={filterOption}>{station}</Option>\n          )}\n        </OptionGroup>\n      )}\n    </Select>\n  </div>\n);\nReactDOM.render(\n  <Demo />,\n  mountNode\n);\n",meta:{order:3,title:{"zh-CN":"选项","en-US":"FilterOption"},subtitle:{"zh-CN":"<p>处理选项用法。</p>\n","en-US":"<p>Use <code>filterOption</code> to flilter options.</p>\n"},__content:""},preview:function(){function e(e){console.log("value: "+e)}function n(e,n){return-1!==n.toLowerCase().indexOf(e.toLowerCase())}var o=t("GiK3"),i=(t("O27J"),t("qMEF")),l=i.Select.Option,a=i.Select.OptionGroup,r=["red","orange","yellow","green","cyan","blue","violet","red1","orange1","yellow1","green1","cyan1","blue1","violet1"],c={"Circle Line":["Buona Vista","Kent Ridge","Bishan","Dhoby Ghaut"],"East West Line":["Chinese Garden","Jurong East"]},u=function(){return o.createElement("div",null,o.createElement(i.Select,{onChange:e},r.map(function(e){return o.createElement(l,{key:e,value:e,filterOption:n},e)}),o.createElement(l,{value:"disabled",disabled:!0,filterOption:n},"disabled")),o.createElement(i.Select,{onChange:e,style:{marginLeft:10}},Object.keys(c).map(function(e){return o.createElement(a,{key:e,label:e},c[e].map(function(e){return o.createElement(l,{key:e,value:e,filterOption:n},e)}))})))};return o.createElement(u,null)}}}});
//# sourceMappingURL=38.c47526b.js.map