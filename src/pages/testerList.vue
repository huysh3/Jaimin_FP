<template>
  <div class="truck-list--container">
    <el-button @click="addHandler" type="primary" size="small">Create +</el-button>
    <el-table :data="tableData">
      <el-table-column width="120" prop="id" label="Id"/>
      <el-table-column prop="name" label="Name"/>
      <el-table-column width="120" prop="number" label="Number"/>
      <el-table-column prop="type" label="Type"/>
      <el-table-column prop="status" label="Status">
        <template scope="scope">
          <el-tag type="success">{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Operations">
        <template scope="scope">
          <el-button @click="editTesterHandler(scope)" type="text">Edit</el-button>
          <el-button @click="deleteTesterHandler(scope)" type="text" style="color: red">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="Edit Tester"
      :visible.sync="testerDialogVisible"
      width="30%">
      <div class="dialog--body">
        <el-input class="dialog-input" v-model="testerDialog.name" placeholder="Name"></el-input>
        <el-input class="dialog-input" v-model="testerDialog.number" placeholder="Number"></el-input>
        <el-input class="dialog-input" v-model="testerDialog.type" placeholder="Type"></el-input>
        <el-input class="dialog-input" v-model="testerDialog.status" placeholder="Status"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="testerDialogVisible = false">Cancel</el-button>
        <el-button @click="dialogConfirm()" type="primary">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';

const dataStructure = {
  name: '',
  number: '',
  type: '',
  status: '',
  currentId: '',
};

export default {
  data() {
    return {
      tableData: [],
      testerDialogVisible: false,
      testerDialog: dataStructure,
    };
  },
  mounted() {
    this.getTesterList();
  },
  methods: {
    getTesterList() {
      axios.get(`http://www.hanligas.com/ajax/get/tester_list`)
        .then((res) => {
          console.log(res);
          this.tableData = res.data;
        });
    },
    addHandler() {
      this.testerDialogVisible = true;
    },
    editTesterHandler(scope) {
      this.testerDialogVisible = true;
      this.testerDialog = JSON.parse(JSON.stringify(scope.row));
      this.testerDialog.currentId = scope.row.id;
    },
    deleteTesterHandler(scope) {
      this.$confirm('确认删除该测试机？')
        .then(() => {
        this.axios.get(`delete/delete_tester?id=${scope.row.id}`)
            .then(() => {
              this.getTesterList();
            });
        })
        .catch(() => false);
    },
    dialogConfirm() {
      this.axios.get(`post/add_tester?name=${this.testerDialog.name}&type=${this.testerDialog.type}&status=${this.testerDialog.status}&number=${this.testerDialog.number}`)
        .then(() => {
          this.getTesterList();
          this.testerDialogVisible = false;
        });
      // this.testerDialogVisible = false;
      // this.tableData.map((item, index) => {
      //   console.log(item.id, this.testerDialog.currentId);
      //   if (String(item.id) === String(this.testerDialog.currentId)) {
      //     console.log(item);
      //     this.$set(this.tableData, index, this.testerDialog);
      //   }
      //   return true;
      // });
    },
  },
};
</script>

<style lang="less" scoped>
.dialog-input {
  margin-bottom: .7rem;
}
</style>
