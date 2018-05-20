<template>
  <div class="truck-list--container">
    <div class="options--container">
      <el-button @click="addNodeContainer" type="primary" size="small">Add Node +</el-button>
    </div>
    <el-table :data="tableData">
      <el-table-column prop="name" label="Name"/>
      <el-table-column label="Address">
        <template scope="scope">
          <el-tag>{{scope.row.host}}</el-tag>
          <span style="padding: 0 12px;">:</span>
          <el-tag>{{scope.row.port}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="Id"/>
      <el-table-column>
        <template scope="scope">
          <el-button @click="deleteHandler(scope)" style="color: red;" type="text">Delete</el-button>
        </template>
      </el-table-column>

    </el-table>
    <el-dialog
      title="Add Node"
      :visible.sync="nodeDialogVisible"
      width="30%">
      <div class="dialog--body">
        <el-input v-model="nodeDialogData.host" class="dialog-input" placeholder="Input Host"></el-input>
        <el-input v-model="nodeDialogData.port" class="dialog-input" placeholder="Input Port"></el-input>
        <el-input v-model="nodeDialogData.name" class="dialog-input" placeholder="Input Node Name"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="nodeDialogVisible = false">Cancel</el-button>
        <el-button size="small" @click="nodeDialogConfirmHandler" type="primary">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
const nodeStructure = {
  host: '',
  port: '',
  name: '',
};

export default {
  data() {
    return {
      nodeDialogData: nodeStructure,
      tableData: [],
      nodeDialogVisible: false,
    };
  },
  mounted() {
    this.getHosts();
  },
  methods: {
    deleteHandler(scope) {
      console.log(scope.row.id);
      this.$confirm('确认删除该node？')
        .then(() => {
          const idxTable = [];
          this.tableData.map((item) => {
            if (item.id !== scope.row.id) {
              idxTable.push(item);
            }
            return true;
          });
          this.tableData = idxTable;
        })
        .catch(() => false);
    },
    getHosts() {
      this.axios.get(`/hosts`)
        .then((res) => {
          console.log(res);
          this.tableData = res.hosts;
        });
    },
    addNodeContainer() {
      this.nodeDialogData = nodeStructure;
      this.nodeDialogVisible = true;
    },
    nodeDialogConfirmHandler() {
      this.axios.post(`/hosts`, this.nodeDialogData)
        .then((res) => {
          console.log(res);
          this.nodeDialogVisible = false;
          this.getHosts();
        });
    },
  },
};
</script>

<style lang="less" scoped>
.options--container {
  padding-bottom: 20px;
}
.dialog-input {
  margin-bottom: 20px;
}
</style>
