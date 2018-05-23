<template>
  <div class="product-list--container">
    <el-button @click="addHandler" type="primary" size="small">Create +</el-button>
    <el-table :data="tableData">
      <el-table-column prop="id" label="Id"/>
      <el-table-column prop="name" label="Name"/>
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
      :visible.sync="productDialogVisible"
      width="30%">
      <div class="dialog--body">
        <el-input class="dialog-input" v-model="productDialog.name" placeholder="Name"></el-input>
        <el-input class="dialog-input" v-model="productDialog.img_url" placeholder="Image Url"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="productDialogVisible = false">Cancel</el-button>
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
      productDialogVisible: false,
      productDialog: dataStructure,
    };
  },
  mounted() {
    this.getProductList();
  },
  methods: {
    getProductList() {
      axios.get(`http://www.hanligas.com/ajax/get/product_list`)
          .then((res) => {
            console.log(res);
            this.tableData = res.data;
          });
    },
    addHandler() {
      this.productDialogVisible = true;
    },
    editTesterHandler(scope) {
      this.productDialogVisible = true;
      this.productDialog = JSON.parse(JSON.stringify(scope.row));
      this.productDialog.currentId = scope.row.id;
    },
    deleteTesterHandler(scope) {
      this.$confirm('确认删除该车辆？')
        .then(() => {
        this.axios.get(`delete/delete_product?id=${scope.row.id}`)
            .then(() => {
              this.getProductList();
            });
        })
        .catch(() => false);
    },
    dialogConfirm() {
      console.log(this.productDialog);
      this.axios.get(`post/add_product?name=${this.productDialog.name}&img_url=${this.productDialog.img_url}`)
        .then(() => {
          this.productDialogVisible = false;
          this.getProductList();
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
