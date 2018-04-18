<template>
  <div class="view-activities--container">
    <div class="container--title">View Activities</div>
    <div style="margin-top: 20px">
      <el-radio-group v-model="shipSelector" size="small">
        <el-radio-button v-for="(item, $index) in shipList" :key="$index" :label="item.ship_id">{{item.name}}</el-radio-button>
      </el-radio-group>
    </div>
    <div style="margin-top: 20px"></div>
      <el-radio-group v-model="unitSelector" size="small">
        <el-radio-button
          v-for="(item, $index) in unitList"
          :key="$index"
          :label="item.unit_id">
            {{item.name}}
        </el-radio-button>
      </el-radio-group>
    <el-table :data="activityList" stripe style="margin-top: 2rem;">
      <el-table-column prop="title" label="title"></el-table-column>
      <el-table-column prop="type" label="type"></el-table-column>
      <el-table-column prop="description" label="description"></el-table-column>
      <el-table-column prop="requirements" label="requirements"></el-table-column>
      <el-table-column label="Options">
        <template scope="scope">
          <el-button @click="deleteContent(scope)" style="color: #f00" type="text">Delete</el-button>
          <el-button @click="editContent(scope)" type="text">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="options--container">
      <el-button @click="showActivityPool" class="costa-btn_primary" size="small">Create Activity +</el-button>
    </div>

    <el-dialog >

    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        shipList: [],
        unitList: [],
        shipSelector: '',
        unitSelector: '',
        activityList: [],
      };
    },
    mounted() {
      this.getShipList();
    },
    watch: {
      shipSelector(newVal) {
        console.log(newVal);
        this.getUnitListByShipId(newVal);
      },
      unitSelector(newVal) {
        console.log(newVal);
        this.getActivityListByUnitId(newVal, 'activity');
      },
    },
    methods: {
      getShipList() {
        this.axios.get('/Ship/getShipList')
            .then((res) => {
              console.log(res.data);
              this.shipList = res.data;
            });
      },
      getUnitListByShipId(shipId) {
        this.axios.get(`/Unit/getUnitListByShipId?ship_id=${shipId}`)
            .then((res) => {
              this.unitList = res.data;
            });
      },
      getActivityListByUnitId(unitId, type) {
        this.axios.get(`/Template/getContentTplListByUnitId?unit_id=${unitId}&type=${type}`)
            .then((res) => {
              console.log(res.data);
              this.activityList = res.data || [];
              console.log(res.data);
            });
      },
      deleteContent(scope) {
        console.log(scope.row);
        this.$confirm('Please confirm you would like to delete this?', 'Notice', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'error',
        }).then(() => {
          this.axios.get(`/Content_tpl/deleteDataById?content_tpl_id=${scope.row.content_tpl_id}`)
            .then(() => {
              this.$message.success('删除成功');
              this.activityList.splice(scope.$index, 1);
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          });
        });
      },
      editContent(scope) {
        console.log(scope.row);
      },
    },
  };
</script>
