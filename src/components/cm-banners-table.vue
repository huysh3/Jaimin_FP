<template>
  <el-table border :data="tableData" height="250">
    <el-table-column prop="business_unit" label="business_unit"></el-table-column>
    <el-table-column prop="title" label="title"></el-table-column>
    <el-table-column prop="location" label="location"></el-table-column>
    <el-table-column prop="start_time" label="start_time"></el-table-column>
    <el-table-column prop="end_time" label="end_time"></el-table-column>
    <el-table-column prop="card_style" label="card_style"></el-table-column>
  </el-table>
</template>

<script>
export default {
  props: ['tableData'],
};
</script>
