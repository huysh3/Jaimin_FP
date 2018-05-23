<template>
  <div class="cq-list--container">
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
      :visible.sync="cqDialogVisible"
      width="30%">
      <div class="dialog--body">
        <el-input class="dialog-input" v-model="cqDialog.img_url" placeholder="Image Url"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cqDialogVisible = false">Cancel</el-button>
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
      cqDialogVisible: false,
      cqDialog: dataStructure,
    };
  },
  mounted() {
    this.getCQList();
  },
  methods: {
    getCQList() {
      axios.get(`http://www.hanligas.com/ajax/get/company_qualification_list`)
          .then((res) => {
            console.log(res);
            this.tableData = res.data;
          });
    },
    addHandler() {
      this.cqDialogVisible = true;
    },
    editTesterHandler(scope) {
      this.cqDialogVisible = true;
      this.cqDialog = JSON.parse(JSON.stringify(scope.row));
      this.cqDialog.currentId = scope.row.id;
    },
    deleteTesterHandler(scope) {
      this.$confirm('确认删除该车辆？')
        .then(() => {
        this.axios.get(`delete/delete_company_qualification?id=${scope.row.id}`)
            .then(() => {
              this.getCQList();
            });
        })
        .catch(() => false);
    },
    dialogConfirm() {
      console.log(this.cqDialog);
      this.axios.get(`post/add_company_qualification?name=${this.cqDialog.name}&img_url=${this.cqDialog.img_url}`)
        .then(() => {
          this.cqDialogVisible = false;
          this.getCQList();
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
