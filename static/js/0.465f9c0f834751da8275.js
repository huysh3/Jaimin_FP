webpackJsonp([0],{ELMr:function(t,e,a){"use strict";var l=a("mvHQ"),s=a.n(l),i=a("mtWM"),o=a.n(i),r={name:"",number:"",type:"",status:"",currentId:""};e.a={data:function(){return{tableData:[],testerDialogVisible:!0,testerDialog:r}},mounted:function(){var t=this;o.a.get("http://www.hanligas.com/ajax/get/truck_list").then(function(e){console.log(e),t.tableData=e.data})},methods:{editTesterHandler:function(t){this.testerDialogVisible=!0,this.testerDialog=JSON.parse(s()(t.row)),this.testerDialog.currentId=t.row.id},deleteTesterHandler:function(t){console.log(t.row.id)},dialogConfirm:function(){var t=this;this.testerDialogVisible=!1,this.tableData.map(function(e,a){return console.log(e.id,t.testerDialog.currentId),String(e.id)===String(t.testerDialog.currentId)&&(console.log(e),t.$set(t.tableData,a,t.testerDialog)),!0})}}}},H9wA:function(t,e,a){var l=a("PPV8");"string"==typeof l&&(l=[[t.i,l,""]]),l.locals&&(t.exports=l.locals);a("rjj0")("38928a7c",l,!0,{})},PPV8:function(t,e,a){e=t.exports=a("FZ+f")(!1),e.push([t.i,".dialog-input[data-v-1acc420d]{margin-bottom:.7rem}",""])},Su20:function(t,e,a){"use strict";var l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"truck-list--container"},[a("el-table",{attrs:{data:t.tableData}},[a("el-table-column",{attrs:{prop:"id",label:"Id"}}),t._v(" "),a("el-table-column",{attrs:{prop:"name",label:"Name"}}),t._v(" "),a("el-table-column",{attrs:{prop:"number",label:"Number"}}),t._v(" "),a("el-table-column",{attrs:{prop:"type",label:"Type"}}),t._v(" "),a("el-table-column",{attrs:{prop:"status",label:"Status"}}),t._v(" "),a("el-table-column",{attrs:{label:"Operations"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text"},on:{click:function(a){t.editTesterHandler(e)}}},[t._v("Edit")]),t._v(" "),a("el-button",{staticStyle:{color:"red"},attrs:{type:"text"},on:{click:function(a){t.deleteTesterHandler(e)}}},[t._v("Delete")])]}}])})],1),t._v(" "),a("el-dialog",{attrs:{title:"Edit Tester",visible:t.testerDialogVisible,width:"30%"},on:{"update:visible":function(e){t.testerDialogVisible=e}}},[a("div",{staticClass:"dialog--body"},[a("el-input",{staticClass:"dialog-input",attrs:{placeholder:"Name"},model:{value:t.testerDialog.name,callback:function(e){t.$set(t.testerDialog,"name",e)},expression:"testerDialog.name"}}),t._v(" "),a("el-input",{staticClass:"dialog-input",attrs:{placeholder:"Number"},model:{value:t.testerDialog.number,callback:function(e){t.$set(t.testerDialog,"number",e)},expression:"testerDialog.number"}}),t._v(" "),a("el-input",{staticClass:"dialog-input",attrs:{placeholder:"Type"},model:{value:t.testerDialog.type,callback:function(e){t.$set(t.testerDialog,"type",e)},expression:"testerDialog.type"}}),t._v(" "),a("el-input",{staticClass:"dialog-input",attrs:{placeholder:"Status"},model:{value:t.testerDialog.status,callback:function(e){t.$set(t.testerDialog,"status",e)},expression:"testerDialog.status"}})],1),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.testerDialogVisible=!1}}},[t._v("Cancel")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.dialogConfirm()}}},[t._v("Confirm")])],1)])],1)},s=[],i={render:l,staticRenderFns:s};e.a=i},jPNU:function(t,e,a){"use strict";function l(t){a("H9wA")}Object.defineProperty(e,"__esModule",{value:!0});var s=a("ELMr"),i=a("Su20"),o=a("VU/8"),r=l,n=o(s.a,i.a,!1,r,"data-v-1acc420d",null);e.default=n.exports}});