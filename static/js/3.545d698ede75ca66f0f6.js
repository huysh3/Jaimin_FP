webpackJsonp([3],{"/bhH":function(t,e,a){"use strict";e.a={data:function(){return{tableData:[]}},mounted:function(){this.getImageList()},methods:{getImageList:function(){var t=this;this.axios.get("/images?1=1&host_id=1").then(function(e){t.tableData=e})}}}},"1/bx":function(t,e,a){var l=a("C/Hb");"string"==typeof l&&(l=[[t.i,l,""]]),l.locals&&(t.exports=l.locals);a("rjj0")("8a83366a",l,!0,{})},"1Ulf":function(t,e,a){"use strict";var l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("el-table",{attrs:{data:t.tableData}},[a("el-table-column",{attrs:{prop:"Id",label:"Id"}}),t._v(" "),a("el-table-column",{attrs:{prop:"VirtualSize",label:"Virtual Size"}}),t._v(" "),a("el-table-column",{attrs:{prop:"Size",label:"Size"}}),t._v(" "),a("el-table-column",{attrs:{prop:"SharedSize",label:"Shared Size"}}),t._v(" "),a("el-table-column",{attrs:{prop:"RepoDigests",label:"Repo Digests"}}),t._v(" "),a("el-table-column",{attrs:{prop:"RepoTags",label:"Repo Tags"}}),t._v(" "),a("el-table-column",{attrs:{label:"Operation"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{staticStyle:{color:"red"},attrs:{type:"text"}},[t._v("Delete")])]}}])})],1)],1)},o=[],n={render:l,staticRenderFns:o};e.a=n},"C/Hb":function(t,e,a){e=t.exports=a("FZ+f")(!1),e.push([t.i,"",""])},"CH/o":function(t,e,a){"use strict";function l(t){a("1/bx")}Object.defineProperty(e,"__esModule",{value:!0});var o=a("/bhH"),n=a("1Ulf"),s=a("VU/8"),r=l,i=s(o.a,n.a,!1,r,"data-v-da73bc4e",null);e.default=i.exports}});