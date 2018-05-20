<template>
  <div class="container">
    <el-button size="small" @click="addImageHandler" type="primary">Add +</el-button>
    <el-table :data="tableData">
      <el-table-column prop="host_id" label="Host Id"/>
      <el-table-column prop="id" label="Id"/>
      <el-table-column prop="name" label="Name"/>
      <el-table-column prop="created_at" label="Created At"/>
      <el-table-column label="Operation">
        <template scope="scope">
          <el-button type="text" style="color: red;">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="Add Image"
      :visible.sync="addImageDialogVisible"
      width="30%">
      <div class="dialog--body">
        <el-input v-model="imageStructure.host_id" style="margin-bottom: 1rem;" type="text">
          <template slot="prepend">Host Id</template>
        </el-input>
        <el-input v-model="imageStructure.name" style="margin-bottom: 1rem;" type="text">
          <template slot="prepend">Name</template>
        </el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addImageDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
const imageStructure = {
  host_id: '',
  name: '',
};

const generateDate = () => {
  const a = new Date();
  return `${a.getFullYear()}-${a.getMonth()}-${a.getDate()} ${a.getHours()}:${a.getMinutes()}:${a.getSeconds()}`;
};

export default {
  data() {
    return {
      imageStructure,
      addImageDialogVisible: false,
      tableData: [],
    };
  },
  mounted() {
    this.getImageList();
  },
  methods: {
    addImageHandler() {
      this.addImageDialogVisible = true;
      this.imageStructure = imageStructure;
    },
    getImageList() {
      this.axios.get(`/images?1=1`)
        .then((res) => {
          console.log(res);
          this.tableData = res;
        });
    },
    confirmAdd() {
      this.imageStructure.created_at = generateDate();
      this.tableData.push(this.imageStructure);
      this.tableData = JSON.parse(JSON.stringify(this.tableData));
      this.addImageDialogVisible = false;
    },
  },
};
</script>

<style lang="less" scoped>

</style>
