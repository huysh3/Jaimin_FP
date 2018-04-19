<template>
  <div class="truck-list--container">
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
    this.getHosts();
  },
  methods: {
    getHosts() {
      this.axios.get(`/hosts`)
        .then((res) => {
          console.log(res);
          this.tableData = res.hosts;
        });
    },
  },
};
</script>

<style lang="less" scoped>

</style>
