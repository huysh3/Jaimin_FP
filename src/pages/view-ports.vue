<template>
  <div class="view-ports--container">
    <el-table :data="ports">
      <el-table-column sortable prop="port_id" label="Port ID"></el-table-column>
      <el-table-column sortable prop="name_en" label="Port Name(English)"></el-table-column>
      <el-table-column sortable prop="name" label="Port Name(Chinese)"></el-table-column>
      <el-table-column label="Operation">
        <template scope="scope">
          <el-button @click="editPortHandler(scope)" size="small" type="text">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog width="24%" :visible.sync="portEditDialogVisible" title="Ports">
      <div class="dialog--body">
        <div class="form-input--container">
          <div class="title">Port ID</div>
          <el-input size="small" disabled class="" v-model="portEditDialogData.port_id"></el-input>
        </div>
        <div class="form-input--container">
          <div class="title">Port Name(English)</div>
          <el-input size="small" class="" v-model="portEditDialogData.name_en"></el-input>
        </div>
        <div class="form-input--container">
          <div class="title">Port Name(Chinese)</div>
          <el-input size="small" class="" v-model="portEditDialogData.name"></el-input>
        </div>
      </div>
      <div class="dialog--footer">
        <el-button @click="savePortHandler" class="costa-btn_blue btn" size="small">Save</el-button>
        <el-button @click="portEditDialogVisible = false" class="btn" size="small">Cancel</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      portEditDialogVisible: false,
      portEditDialogData: {},
      ports: [{
        port_id: '1',
        port_name: 'ShangHai',
        port_name_cn: '上海',
      }, {
        port_id: '2',
        port_name: 'SZ',
        port_name_cn: '深圳',
      }],
    };
  },
  mounted() {
    this.getPortList();
  },
  methods: {
    editPortHandler(scope) {
      console.log(scope);
      this.portEditDialogVisible = true;
      this.portEditDialogData = JSON.parse(JSON.stringify(scope.row));
    },
    savePortHandler() {
      this.axios.post(`Port/updatePort`, this.portEditDialogData)
        .then((res) => {
          console.log(res.data);
          this.portEditDialogVisible = false;
        });
    },
    getPortList() {
      this.axios.get(`/Port/getPortList`)
          .then((res) => {
            this.ports = res.data;
          });
    },
  },
};
</script>

<style lang="less" scoped>
  .form-input--container {
    padding-bottom: .7rem;
  }
  .dialog--footer {
    padding-top: 1.3rem;
    .btn {
      padding: .4rem 1.4rem;
    }
  }
</style>
