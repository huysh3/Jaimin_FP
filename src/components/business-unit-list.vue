<template>
  <div class="select-business-unit--container">
    <div class="top--part">
      <span class="title">Select Business Unit</span>
      <el-button class="costa-btn_blue">Add business Unit +</el-button>
    </div>
    <el-row class="unit--list">
      <el-col v-for="(item, index) in unitList" :key="`${index}idx`" :span="6" class="unit--item">
        <div class="item--name">{{item.name}}</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        unitList: [{
          name: 'SPA',
        }, {
          name: 'Ship',
        }, {
          name: 'Duty Free',
        }, {
          name: 'Entertainment',
        }, {
          name: 'FnB',
        }, {
          name: 'Cabin Services',
        }, {
          name: 'Kids',
        }],
      };
    },
  };
</script>
