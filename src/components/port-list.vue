<template>
  <div class="port-list--container">
    <div class="top--content">
      <div class="port-list--title">Port List</div>
      <el-button @click="addPortHandler" size="small" class="costa-btn_blue">Add Port+</el-button>
    </div>
    <el-table :data="portList" empty-text="No data">
      <el-table-column sortable prop="port_id" label="port id"></el-table-column>
      <el-table-column sortable prop="name" label="port name"></el-table-column>
      <!-- <el-table-column sortable prop="city_id" label="City ID"></el-table-column> -->
      <el-table-column
        label="Operation"
        width="100">
        <template scope="scope">
          <el-button @click="deletePortHandler(scope)" style="color: red;" type="text" size="small">Delete</el-button>
          <el-button @click="editPortHandler(scope)" type="text" size="small">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="Add Port" :visible.sync="portDialogVisible" width="30%">
      <div class="form-cell--container">
        <div class="form--title">Port Name</div>
        <el-input v-model="portDialog.name" size="small"></el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="saveChangeHandler" size="small" class="costa-btn_blue">Confirm</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        portList: [],
        portDialogVisible: false,
        portTemplateData: {
          port_id: '',
          name: '',
        },
        portDialog: '',
      };
    },
    mounted() {
      this.getPortList();
    },
    methods: {
      getPortList() {
        this.axios.get('/Port/getPortList')
            .then((res) => {
              console.log(res.data);
              this.portList = res.data;
            });
      },
      editPortHandler(scope) {
        this.portDialogVisible = true;
        this.portDialogStatus = 'edit';
        console.log(scope.row.port_id);
        console.log(scope.row.name);
        this.portDialog = scope.row;
      },
      addPortHandler() {
        this.portDialogVisible = true;
        this.portDialogStatus = 'add';
        this.portDialog = this.portTemplateData;
      },
      saveChangeHandler() {
        console.log(this.portDialog);
        this.axios.post('/Port/updatePort', this.portDialog)
            .then((res) => {
              console.log(res.data);
              this.portDialogVisible = false;
              this.getPortList();
            });
      },
      deletePortHandler(scope) {
        console.log(scope.$index);
        console.log(scope.row.port_id);
        this.$confirm('Please confirm you would like to delete this?', 'Notice', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'error',
        }).then(() => {
          this.axios.get(`/Port/deleteDataById?port_id=${scope.row.port_id}`)
              .then(() => {
                this.portList.map((item, $index) => {
                  if (item.port_id === scope.row.port_id) {
                    this.portList.splice($index, 1);
                  }
                  return true;
                });
              });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          });
        });
      },
    },
  };
</script>
