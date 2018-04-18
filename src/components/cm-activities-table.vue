<template>
  <el-table header-row-class-name="dark-table-header" :data="tableData" height="250">
    <el-table-column sortable prop="unit_id" label="Business Unit" />
    <el-table-column sortable width="160" prop="title" label="Title" />
    <el-table-column sortable prop="location" label="Location" />
    <el-table-column sortable prop="start_time" label="Start Time" />
    <el-table-column sortable prop="end_time" label="End Time" />
    <el-table-column sortable prop="type" label="Card Style" />
    <el-table-column label="Operation">
      <template scope="scope">
        <el-button
          @click="$emit('editActivityHandler', scope)"
          type="text"
        >Edit</el-button>
        <el-button
          class="red"
          @click="$emit('deleteActivityHandler', scope)"
          type="text">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: ['tableData'],
  methods: {
  },
};
</script>

<style lang="less" scoped>
</style>
