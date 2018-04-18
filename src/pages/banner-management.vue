<template>
  <div class="content-management--container">
    <header class="container--header">
      <div class="left-part">
        <b>Trip Code: </b>
        <el-select
          value-key="trip_id"
          v-model="currentTrip"
          placeholder="Please Select"
          size="small">
          <el-option
            v-for="item in $store.state.contentManagement.tripList"
            :key="item.code"
            :label="item.code"
            :value="item" />
        </el-select>
      </div>
      <div class="right-part">
        <el-button
          @click="addItemHandler"
          size="small"
          type="primary"
        >Add +</el-button>
      </div>
    </header>

    <!-- Schedule 选择区域 -->
    <div class="schedule-list--content">
      <div
        class="list-item"
        v-for="(item, $index) in currentTrip.schedule_list"
        :key="`${$index}1`"
        :class="item.status === 'true' ? 'active' : ''"
        @click="changeSchedule(item)">
        <div class="title">Day {{item.day}}</div>
        <div class="date">{{item.name}}</div>
        <!-- <div class="date">{{item.date}}</div> -->
      </div>
    </div>
    <div class="table--container">
      <cm-anb-table
        v-loading="tableLoading"
        @editItemHandler="editItemHandler"
        :tableData="tableData"
      />
    </div>
    <div class="options--area">
      <el-button
        @click="$store.state.activityManagement.activityTplTableDialogVisible = true"
        size="small"
        class="costa-btn_primary">
        Change Template
      </el-button>
      <!-- <el-button size="small" class="costa-btn_primary">Wechat Update</el-button> -->
    </div>
    <add-banner-dialog
      @saveBannerDialog="saveBannerDialog"
      :title="bannerDialogTitle"
      :mode="bannerDialogMode"
      :schedule="currentSchedule"
      :banner-dialog-data="bannerDialogData"/>
  </div>
</template>

<script>
import cmAnbTable from '../components/cm-anb-table';
import addBannerDialog from '../components/add-banner-dialog';

export default {
  data() {
    return {
      bannerDialogData: {},
      currentTrip: '',
      tableData: [],
      tableLoading: false,
      bannerDialogMode: '',
      bannerDialogTitle: '',
      currentSchedule: {},
    };
  },
  components: {
    cmAnbTable,
    addBannerDialog,
  },
  computed: {
    currentShip() {
      return this.$store.state.globalData.currentShip;
    },
  },
  watch: {
    currentShip(newVal) {
      this.getTripListByShipId(newVal);
    },
    currentTrip(newVal) {
      console.log('currentTrip', newVal);
      this.scheduleList = newVal.schedule_list;
      this.scheduleList.map((item) => {
        item.status = 'false';
        return true;
      });
      this.changeSchedule(this.scheduleList[0]);
      // this.$set(this.scheduleList[0], 'status', 'true');
    },
  },
  mounted() {
    this.tableLoading = true;
    this.getTripListByShipId(this.currentShip);
  },
  methods: {
    changeSchedule(schedule) {
      this.currentSchedule = schedule;
      this.scheduleList.map((item, index) => {
        this.$set(this.scheduleList, index, {
          name: item.name,
          day: item.day,
          schedule_id: item.schedule_id,
          status: item.schedule_id === schedule.schedule_id ? 'true' : 'false',
        });
        return true;
      });
      this.getBannerByScheduleId(schedule.schedule_id);
      console.log(this.scheduleList);
    },
    getTripListByShipId(ship) {
      // alert(JSON.stringify(ship));
      this.axios.get(`/Schedule/getScheduleListByShipId?ship_id=${ship.ship_id}`)
          .then((res) => {
            this.$store.state.contentManagement.tripList = res.data;
            [this.currentTrip] = res.data;
          });
    },
    getBannerByScheduleId(scheduleId) {
      console.log(scheduleId);
      this.axios.get(`/Banner/getBannerListByScheduleId?schedule_id=${scheduleId}`)
          .then((res) => {
            console.log(res);
            this.tableData = res.data;
            this.tableLoading = false;
          });
    },
    getTemplateList() {
      // this.axios.get(`/getTemplateList?ship_id=1&type=activity&unit_id=1`)
    },
    addItemHandler() {
      this.$store.state.activityManagement.bannerDialogVisible = true;
      this.bannerDialogTitle = 'Add Banner';
      this.bannerDialogMode = 'add';
    },
    editItemHandler(scope) {
      // this.$store.state.activityManagement.activityInfoInputDialogVisible = true;
      console.log('父组件', scope.row);
    },
    deleteItemHandler(scope) {
      console.log(scope);
    },
    saveBannerDialog(data) {
      console.log('父组件', data);
    },
  },
};
</script>
