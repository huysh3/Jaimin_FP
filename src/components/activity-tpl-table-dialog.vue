<template>
  <el-dialog
    title="Change Template"
    :visible.sync="$store.state.activityManagement.activityTplTableDialogVisible"
    width="60%"
    >
    <el-table
      header-row-class-name="dark-table-header"
      :data="tplData">
      <el-table-column prop="name" label="Ship Name"></el-table-column>
      <el-table-column prop="key_words" label="Template Name"></el-table-column>
      <el-table-column prop="time" label="Last Update"></el-table-column>
      <el-table-column label="Operation">
        <template scope="scope">
          <el-button
            @click="$emit('selectTpl', scope)"
            type="text"
            size="small">Use
          </el-button>
          <el-button
            class="disabled"
            type="text"
            size="small">Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
export default {
  props: ['tplData'],
  data() {
    return {
    };
  },
};
</script>

<style lang="less" scoped>
.disabled {
  color: #c92323;
}
</style>
