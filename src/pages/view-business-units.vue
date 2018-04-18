<template>
  <div class="view-business-units--container">
    <el-table :data="portsData">
      <el-table-column sortable prop="BU_name" label="Business Unit (En)"></el-table-column>
      <el-table-column sortable prop="BU_name_cn" label="Business Unit (Cn)"></el-table-column>
      <el-table-column label="Operation">
        <template scope="scope">
          <el-button @click="editPortHandler(scope)" size="small" type="text">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog width="24%" :visible.sync="portEditDialogVisible" title="Ports">
      <div class="dialog--body">
        <div class="form-input--container">
          <div class="title">Business Unit (En)</div>
          <el-input size="small" disabled class="" v-model="portEditDialogData.BU_name"></el-input>
        </div>
        <div class="form-input--container">
          <div class="title">Business Unit (Cn)</div>
          <el-input size="small" class="" v-model="portEditDialogData.BU_name_cn"></el-input>
        </div>
      </div>
      <div class="dialog--footer">
        <el-button class="costa-btn_blue btn" size="small">Save</el-button>
        <el-button class="btn" size="small">Cancel</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      portEditDialogVisible: false,
      portEditDialogData: {},
      portsData: [{
        BU_name: 'Entertainment',
        BU_name_cn: '娱乐',
      }, {
        BU_name: 'Food',
        BU_name_cn: '美食',
      }],
    };
  },
  mounted() {

  },
  methods: {
    editPortHandler(scope) {
      console.log(scope);
      this.portEditDialogVisible = true;
      this.portEditDialogData = scope.row;
    },
  },
};
</script>

<style lang="less" scoped>
  .form-input--container {
    padding-bottom: .7rem;
  }
  .dialog--footer {
    padding-top: 1.3rem;
    .btn {
      padding: .4rem 1.4rem;
    }
  }
</style>
