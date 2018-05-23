<template>
  <div class="qs-list--container">
    <el-button @click="addHandler" type="primary" size="small">Create +</el-button>
    <el-table :data="tableData">
      <el-table-column prop="id" label="Id"/>
      <el-table-column prop="img_url" label="Img"/>
      <el-table-column label="Operations">
        <template scope="scope">
          <!-- <el-button @click="editTesterHandler(scope)" type="text">Edit</el-button> -->
          <el-button @click="deleteTesterHandler(scope)" type="text" style="color: red">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="Edit Tester"
      :visible.sync="qsDialogVisible"
      width="30%">
      <div class="dialog--body">
        <el-input class="dialog-input" v-model="qsDialog.img_url" placeholder="Image Url"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="qsDialogVisible = false">Cancel</el-button>
        <el-button @click="dialogConfirm()" type="primary">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';

const dataStructure = {
  name: '',
  img_url: '',
};

export default {
  data() {
    return {
      tableData: [],
      qsDialogVisible: false,
      qsDialog: dataStructure,
    };
  },
  mounted() {
    this.getQSList();
  },
  methods: {
    getQSList() {
      axios.get(`http://www.hanligas.com/ajax/get/qs_list`)
          .then((res) => {
            console.log(res);
            this.tableData = res.data;
          });
    },
    addHandler() {
      this.qsDialogVisible = true;
    },
    editTesterHandler(scope) {
      this.qsDialogVisible = true;
      this.qsDialog = JSON.parse(JSON.stringify(scope.row));
      this.qsDialog.currentId = scope.row.id;
    },
    deleteTesterHandler(scope) {
      this.$confirm('确认删除该车辆？')
        .then(() => {
        this.axios.get(`delete/delete_qs?id=${scope.row.id}`)
            .then(() => {
              this.getQSList();
            });
        })
        .catch(() => false);
    },
    dialogConfirm() {
      console.log(this.qsDialog);
      this.axios.get(`post/add_qs?name=${this.qsDialog.name}&img_url=${this.qsDialog.img_url}`)
        .then(() => {
          this.qsDialogVisible = false;
          this.getQSList();
        });
    },
  },
};
</script>

<style lang="less" scoped>
.dialog-input {
  margin-bottom: .7rem;
}
</style>
