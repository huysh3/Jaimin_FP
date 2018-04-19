<template>
  <div class="truck-list--container">
    <el-table :data="tableData">
      <el-table-column width="100" prop="id" label="id"/>
      <el-table-column width="140" prop="method" label="Method">
        <template scope="scope">
          <el-tag type="primary">
            {{scope.row.method}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column width="200" prop="created_at" label="Created At"/>
      <el-table-column width="140" prop="operator" label="Operator"/>
      <el-table-column prop="url" label="Url">
        <template scope="scope">
          {{decodeURIComponent(scope.row.url)}}
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
    this.getLogs();
  },
  methods: {
    getLogs() {
      this.axios.get(`/logs`)
        .then((res) => {
          console.log(res);
          this.tableData = res.logs;
        });
    },
  },
};
</script>

<style lang="less" scoped>

</style>
