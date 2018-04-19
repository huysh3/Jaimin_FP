<template>
  <div class="container">
    <el-table :data="tableData">
      <el-table-column prop="Id" label="Id"/>
      <el-table-column prop="VirtualSize" label="Virtual Size"/>
      <el-table-column prop="Size" label="Size"/>
      <el-table-column prop="SharedSize" label="Shared Size"/>
      <el-table-column prop="RepoDigests" label="Repo Digests"/>
      <el-table-column prop="RepoTags" label="Repo Tags"/>
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
      this.axios.get(`/images?1=1&host_id=1`)
        .then((res) => {
          this.tableData = res;
        });
    },
  },
};
</script>

<style lang="less" scoped>

</style>
