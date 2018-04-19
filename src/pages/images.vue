<template>
  <div class="container">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
    };
  },
  mounted() {
    this.getImageList();
  },
  methods: {
    getImageList() {
      this.axios.get(`/images?1=1`)
        .then((res) => {
          console.log(res);
          this.tableData = res;
        });
    },
  },
};
</script>

<style lang="less" scoped>

</style>
