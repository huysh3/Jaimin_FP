<template>
  <el-dialog
    class="activity-library-dialog--container"
    title="Activity Library"
    :visible.sync="$store.state.activityManagement.activityLibraryDialogVisible"
    width="50%">
    <div class="top--part">
      <el-input class="search-bar" size="" placeholder="Input to filter the data table.."></el-input>
      <el-button @click="$store.state.activityManagement.activityInfoInputDialogVisible = true" class="costa-btn_blue">Create New +</el-button>
    </div>
    <div class="table--container">
      <el-table header-row-class-name="dark-table-header" :data="tableData" height="250">
        <el-table-column prop="business_unit" label="Business Unit"></el-table-column>
        <el-table-column prop="title" label="Title"></el-table-column>
        <el-table-column prop="card_style" label="Card Style"></el-table-column>
        <el-table-column label="Operation">
          <template scope="scope">
            <el-button type="text" size="small">Use</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      tableData: [{
        business_unit: 'BU1',
        title: 'TITLE',
        card_style: 'COMPACT',
        id: '2',
      }, {
        business_unit: 'BU2',
        title: 'TITLE2',
        card_style: 'COMPACT',
        id: '3',
      }, {
        business_unit: 'BU3',
        title: 'TITLE2',
        card_style: 'COMPACT',
        id: '4',
      }],
    };
  },
};
</script>

<style lang="less" scoped>
.activity-library-dialog--container {
  .top--part {
    display: flex;
    .search-bar {
      padding-right: 2rem;
    }
  }
  .costa-btn_blue {
    padding: .6rem 2rem;
  }
}
</style>
