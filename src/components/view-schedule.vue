<template>
  <div class="view-schedule--container main-dialog--container">
    <!-- /Schedule/getScheduleListByShipId?ship_id=1 -->
    <div class="select-ship--container">
      <section class="ship--list">
        <div
          class="ship--content"
          v-for="item in shipList"
          :key="item.ship_id"
          @click="getScheduleListByShipId(item.ship_id)">
            {{item.name}}
        </div>
      </section>
    </div>
    <el-table :data="scheduleList" style="width: 100%" empty-text="No data">
      <el-table-column
        label="Date"
        prop="departure_date"
        width="180">
      </el-table-column>
      <!-- <el-table-column
        label="Route"
        prop="route"
        width="180">
      </el-table-column> -->
      <el-table-column label="Route">
        <template scope="scope">
          <div
            v-for="(item, index) in scope.row.schedule_list"
            class="day--cell"
            :class="item.save_status == '1' ? 'active' : ''"
            :key="index">
            <div class="cell--title">{{item.name}}</div>
            <div class="cell--date">Day {{index + 1}}</div>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        shipList: [],
        scheduleList: [],
      };
    },
    mounted() {
      this.getShipList();
    },
    methods: {
      getShipList() {
        this.axios.get('/Ship/getShipList')
            .then((res) => {
              this.shipList = res.data;
            });
      },
      getScheduleListByShipId(shipId) {
        console.log(shipId);
        this.axios.get(`/Schedule/getScheduleListByShipId?ship_id=${shipId}`)
            .then((res) => {
              console.log(res.data);
              this.scheduleList = res.data;
            });
      },
    },
  };
</script>
