<template>
  <div class="blocker-selector--container">
    <div class="select-ship--container" v-show="selectStep == '1'">
      <div class="title">Select Ship</div>
      <section class="ship--list">
        <div
          class="ship--content"
          v-for="item in shipList"
          :key="item.ship_id"
          @click="getScheduleListByShipId(item.ship_id, item.name)">
            <div>{{item.name}}</div>
            <div class="bg-deco">{{item.name[0]}}</div>
        </div>
      </section>
    </div>
    <div class="select-business-unit--container" v-show="selectStep == '2'">
      <div class="top--part">
        <span class="title">Select Business Unit</span>
      </div>
      <section class="unit--list">
        <el-row class="unit--list">
          <el-col v-for="(item, index) in unitList" :key="`${index}idx`" :span="6" class="unit--item">
            <div @click="setUnit(item)" class="item--name">{{item.name}}</div>
          </el-col>
        </el-row>
      </section>
    </div>
    <div class="select-schedule--container" v-show="selectStep == '3'">
      <div class="title">Select Trip</div>
      <el-table
        :data="tripList"
        style="width: 100%">
        <el-table-column
          label="Date"
          prop="departure_date"
          sortable
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
              :class="item.save_status == '0' ? 'active' : ''"
              :key="index"
              @click="saveScheduleStatus(item.schedule_id, item.name, item.trip_id)">
              <div class="cell--title">{{item.name}}</div>
              <div class="cell--date">Day {{index + 1}}</div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        shipList: [],
        tripList: [],
        selectStep: '1',
        unitList: [],
      };
    },
    mounted() {
      this.getShipList();
      // this.getUnitListByShipId();
    },
    methods: {
      getShipList() {
        this.axios.get('/Ship/getShipList')
            .then((res) => {
              console.log(res.data);
              this.shipList = res.data;
            });
      },
      getTripListByShipId(shipId) {
        console.log(shipId);
        this.axios.get(`/Trip/getTripListByShipId?history=0&ship_id=${shipId}`)
            .then((res) => {
              console.log(res.data);
              this.tripList = res.data;
            });
      },
      getUnitListByShipId(shipId) {
        this.axios.get(`/Unit/getUnitListByShipId?ship_id=${shipId}`)
            .then((res) => {
              this.unitList = res.data;
            });
      },
      getScheduleListByShipId(shipId, shipName) {
        console.log(shipId);
        this.getUnitListByShipId(shipId);
        this.$emit('setShip', {
          shipName,
          shipId,
        });
        this.selectStep = '2';
        console.log(`emit to child ${shipId}`);
        this.axios.get(`/Schedule/getScheduleListByShipId?ship_id=${shipId}`)
            .then((res) => {
              console.log(res.data);
              this.tripList = res.data;
            });
      },
      setUnit(unit) {
        console.log(unit);
        this.$emit('setUnit', {
          name: unit.name,
          unitId: unit.unit_id,
        });
        this.selectStep = '3';
      },
      saveScheduleStatus(scheduleId, scheduleName, tripId) {
        this.$emit('setSchedule', {
          scheduleId,
          scheduleName,
          tripId,
        });
      },
    },
  };
</script>
