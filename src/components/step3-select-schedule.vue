<template>
  <div class="select-schedule--container blocker-selector--container">
    <h3>Select Schedule</h3>
    <el-table :data="scheduleList" style="width: 100%">
      <el-table-column label="Date" prop="departure_date" sortable width="180"></el-table-column>
      <el-table-column label="Route">
        <template scope="scope">
          <div
            v-for="(item, index) in scope.row.schedule_list"
            class="day--cell"
            :class="item.save_status == '0' ? 'active' : ''"
            :key="index"
            @click="selectSchedule(item)">
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
      scheduleList: [],
    };
  },
  mounted() {
    this.getScheduleList(this.$route.params.ship_id);
    this.$store.state.breadcrumbState.schedule = {};
  },
  methods: {
    getScheduleList(shipId) {
      console.log(shipId);
      // this.getUnitListByShipId(shipId);
      this.axios.get(`/Schedule/getScheduleListByShipId?ship_id=${shipId}`)
          .then((res) => {
            console.log(res.data);
            this.scheduleList = res.data;
          });
    },
    selectSchedule(schedule) {
      this.$store.state.breadcrumbState.schedule = schedule;
      this.$router.push({
        name: this.$route.params.origin,
        params: {
          origin: this.$route.params.origin,
          ship_id: this.$route.params.ship_id,
          unit_id: this.$route.params.unit_id,
          schedule_id: schedule.schedule_id,
          trip_id: schedule.trip_id,
        },
      });
    },
  },
};
</script>
