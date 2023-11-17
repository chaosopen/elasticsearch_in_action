(window.webpackJsonp=window.webpackJsonp||[]).push([[54],{368:function(t,a,s){"use strict";s.r(a);var r=s(14),e=Object(r.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"_5-3-搜索实战项目示例"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5-3-搜索实战项目示例"}},[t._v("#")]),t._v(" 5.3 搜索实战项目示例")]),t._v(" "),a("p",[t._v("项目示例源码："),a("a",{attrs:{href:"https://github.com/chaosopen/elasticsearch_in_action_source_code/tree/master/chapter5",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://github.com/chaosopen/elasticsearch_in_action_source_code/tree/master/chapter5"),a("OutboundLink")],1)]),t._v(" "),a("p",[t._v("将项目克隆本地，运行 "),a("code",[t._v("chapter5")]),t._v(" 模块下的项目。")]),t._v(" "),a("h2",{attrs:{id:"_5-3-1-操作商品数据"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5-3-1-操作商品数据"}},[t._v("#")]),t._v(" 5.3.1 操作商品数据")]),t._v(" "),a("h3",{attrs:{id:"_1-添加数据"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-添加数据"}},[t._v("#")]),t._v(" 1. 添加数据")]),t._v(" "),a("p",[t._v("POST请求地址：http://localhost:8080/addProduct")]),t._v(" "),a("p",[t._v("参数")]),t._v(" "),a("div",{staticClass:"language-json extra-class"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"spuId"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"1"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"categoryName"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"手机"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"productName"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"新款现货Apple/苹果 iPhone 14 Pro国行苹果14promax双卡正品手机"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"price"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("6349")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"attrs"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"[{\\"name\\":\\"颜色\\",\\"value\\":\\"黑色\\"},{\\"name\\":\\"内存\\",\\"value\\":\\"64G\\"}]"')]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h3",{attrs:{id:"_2-修改数据"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-修改数据"}},[t._v("#")]),t._v(" 2. 修改数据")]),t._v(" "),a("p",[t._v("POST请求地址：http://localhost:8080/updateProduct")]),t._v(" "),a("p",[t._v("参数")]),t._v(" "),a("div",{staticClass:"language-json extra-class"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"id"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"11"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"price"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("6675")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h3",{attrs:{id:"_3-删除数据"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-删除数据"}},[t._v("#")]),t._v(" 3. 删除数据")]),t._v(" "),a("p",[t._v("POST请求地址：http://localhost:8080/deleteProduct")]),t._v(" "),a("p",[t._v("参数")]),t._v(" "),a("div",{staticClass:"language-json extra-class"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"id"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"11"')]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h2",{attrs:{id:"_5-3-2-搜索商品数据"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5-3-2-搜索商品数据"}},[t._v("#")]),t._v(" 5.3.2 搜索商品数据")]),t._v(" "),a("h3",{attrs:{id:"_1-关键词搜索"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-关键词搜索"}},[t._v("#")]),t._v(" 1. 关键词搜索")]),t._v(" "),a("p",[t._v("GET请求地址："),a("a",{attrs:{href:"http://localhost:8080/keywordSearch?keyword=%E8%8B%B9%E6%9E%9C%E6%89%8B%E6%9C%BA",target:"_blank",rel:"noopener noreferrer"}},[t._v("http://localhost:8080/keywordSearch?keyword=苹果手机"),a("OutboundLink")],1)]),t._v(" "),a("p",[a("strong",[t._v("其他方式的搜索不做演示，读者可根据前面章节的知识进行扩展")])]),t._v(" "),a("p",[a("font",{attrs:{color:"red"}},[a("strong",[t._v("有兴趣读者可以补充项目代码，提交到GitHub，一起完善项目。")])])],1)])}),[],!1,null,null,null);a.default=e.exports}}]);