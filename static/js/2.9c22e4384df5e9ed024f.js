webpackJsonp([2],{"20xp":function(t,e,a){"use strict";e.a={data:function(){return{tableData:[]}},mounted:function(){this.getHosts()},methods:{getHosts:function(){var t=this;this.axios.get("/hosts").then(function(e){console.log(e),t.tableData=e.hosts})}}}},LzK4:function(t,e,a){e=t.exports=a("FZ+f")(!1),e.push([t.i,"",""])},gEff:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"truck-list--container"},[a("el-table",{attrs:{data:t.tableData}},[a("el-table-column",{attrs:{prop:"name",label:"Name"}}),t._v(" "),a("el-table-column",{attrs:{label:"Address"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-tag",[t._v(t._s(e.row.host))]),t._v(" "),a("span",{staticStyle:{padding:"0 12px"}},[t._v(":")]),t._v(" "),a("el-tag",[t._v(t._s(e.row.port))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"id",label:"Id"}})],1)],1)},n=[],o={render:s,staticRenderFns:n};e.a=o},i0Op:function(t,e,a){"use strict";function s(t){a("n0d6")}Object.defineProperty(e,"__esModule",{value:!0});var n=a("20xp"),o=a("gEff"),l=a("VU/8"),r=s,i=l(n.a,o.a,!1,r,"data-v-f586b774",null);e.default=i.exports},n0d6:function(t,e,a){var s=a("LzK4");"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);a("rjj0")("5fcd3821",s,!0,{})}});