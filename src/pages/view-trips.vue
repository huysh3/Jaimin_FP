<template>
  <div class="view-trips--container">
    <header class="view-trips--header">
      <el-radio-group v-model="tripListStatus" size="mini">
        <el-radio-button label="active">Active Trips</el-radio-button>
        <el-radio-button label="past">Past Trips</el-radio-button>
      </el-radio-group>
      <el-button
        @click="addTripHandler"
        size="mini"
        class="costa-btn_blue">
        Add +
      </el-button>
    </header>
    <el-table :data="tripData">
      <el-table-column sortable prop="ship_name" width="120" label="Ship Name"></el-table-column>
      <el-table-column sortable prop="trip_code" label="Trip Code"></el-table-column>
      <el-table-column sortable prop="departure_date" label="Dep. Date"></el-table-column>
      <el-table-column sortable prop="port" label="Port"></el-table-column>
      <el-table-column sortable prop="duration" label="Duration"></el-table-column>
      <el-table-column sortable prop="source" width="100" label="Source"></el-table-column>
      <el-table-column label="Content Status">
        <template scope="scope">
          <i
            v-for="(item, $index) in scope.row.activity_ready"
            :key="$index"
            class="activity-ready-points"
            :class="item == '1' ? 'el-icon-error' : 'el-icon-success'"
          />
          <!-- <i class="iconfont activity-ready-points" v-for="(item, $index) in scope.row.activity_ready" :key="$index">
            {{item == '1' ? '&#xe642;' : '&#xe6d0;'}}
          </i> -->
        </template>
      </el-table-column>
      <el-table-column label="Operation">
        <template scope="scope">
          <el-button size="small" type="text">Edit</el-button>
          <el-button class="red" size="small" type="text">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="operations--container">
      <el-button size="small" class="costa-btn_blue">
        Sync
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tripListStatus: 'active',
      tripData: [{
        ship_name: 'Serena',
        trip_code: 'ES29156',
        departure_date: 4,
        port: 'Shanghai',
        duration: '5 Days 4 Nights',
        source: 'OMS',
        activity_ready: [1, 0, 1, 0, 1],
      }, {
        ship_name: 'Serena',
        trip_code: 'ES29156',
        departure_date: 4,
        port: 'Shanghai',
        duration: '5 Days 4 Nights',
        source: 'OMS',
        activity_ready: [1, 0, 0, 0, 0],
      }, {
        ship_name: 'Serena',
        trip_code: 'ES29156',
        departure_date: 4,
        port: 'Shanghai',
        duration: '5 Days 4 Nights',
        source: 'OMS',
        activity_ready: [1, 0, 1, 1, 1],
      }],
    };
  },
  methods: {
    addTripHandler() {
      this.$router.push({
        name: 'tripAdd',
      });
    },
  },
};
</script>

<style lang="less" scoped>
.activity-ready-points {
  color: #2f6db3;
  margin-right: .2rem;
  display: inline-block;
  transform: scale(1.2);
}
.view-trips--header {
  display: flex;
  margin-bottom: 1rem;
  justify-content: space-between;
}
.operations--container {
  padding-top: 2rem;
  .costa-btn_blue {
    padding: .4rem 2rem;
  }
  .activity-ready-points {
    // position: relative;
    // top: .1rem;
    margin-right: .2rem;
    display: inline-block;
  }
}

</style>
