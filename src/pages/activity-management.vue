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
          @click="$store.state.activityManagement.activityLibraryDialogVisible = true"
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
      </div>
    </div>
    <div class="table--container">
      <cmActivitiesTable
        v-loading="cmActivitiesTableLoading"
        @editActivityHandler="editActivityHandler"
        :tableData="activityList"
      />
    </div>
    <div class="options--area">
      <el-button
        @click="showTplDialog"
        size="small"
        class="costa-btn_primary">
        Change Template
      </el-button>
      <!-- <el-button size="small" class="costa-btn_primary">Wechat Update</el-button> -->
    </div>
    <activityInfoInputDialog ref="activityInfoInputDialog" />
    <activityLibraryDialog
      :dialogVisible="$store.state.activityManagement.activityLibraryDialogVisible" />
    <activityTplTableDialog
      @selectTpl="selectTpl"
      :tplData="templateList"/>
  </div>
</template>

<script>
import cmActivitiesTable from '../components/cm-activities-table';
import activityInfoInputDialog from '../components/activity-info-input-dialog';
import activityLibraryDialog from '../components/activity-library-dialog';
import activityTplTableDialog from '../components/activity-tpl-table-dialog';

export default {
  data() {
    return {
      activityInfoInputDialogVisible: false,
      activityLibraryDialogVisible: false,
      currentTrip: '',
      activityList: [],
      cmActivitiesTableLoading: false,
      templateList: [],
    };
  },
  components: {
    cmActivitiesTable,
    activityInfoInputDialog,
    activityLibraryDialog,
    activityTplTableDialog,
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
      this.$set(this.scheduleList[0], 'status', 'true');
      this.getActivityByScheduleId(this.scheduleList[0].schedule_id);
    },
  },
  mounted() {
    this.cmActivitiesTableLoading = true;
    this.getTripListByShipId(this.currentShip);
  },
  methods: {
    changeSchedule(schedule) {
      this.scheduleList.map((item, index) => {
        this.$set(this.scheduleList, index, {
          name: item.name,
          day: item.day,
          schedule_id: item.schedule_id,
          status: item.schedule_id === schedule.schedule_id ? 'true' : 'false',
        });
        return true;
      });
      this.getActivityByScheduleId(schedule.schedule_id);
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
    getActivityByScheduleId(scheduleId) {
      this.axios.get(`/Activity/getActivityListByScheduleId?schedule_id=${scheduleId}`)
          .then((res) => {
            console.log(res);
            this.activityList = res.data;
            this.cmActivitiesTableLoading = false;
          });
    },
    showTplDialog() {
      this.$store.state.activityManagement.activityTplTableDialogVisible = true;
      this.getTemplateList(this.currentShip.ship_id);
    },
    getTemplateList(shipId) {
      this.axios.get(`/Template/getTemplateList?ship_id=${shipId}&type=activity`)
          .then((res) => {
            this.templateList = res.data;
          });
    },
    editActivityHandler(scope) {
      this.$store.state.activityManagement.activityInfoInputDialogVisible = true;
      this.$refs.activityInfoInputDialog.getBusinessUnitList(this.currentShip.ship_id);
      console.log('父组件', scope.row);
    },
    deleteActivityHandler(scope) {
      console.log(scope.activity_id);
    },
    selectTpl(scope) {
      console.log('父组件的', scope.row.template_id);
      this.getTemplateDataByTemplateId(scope.row.template_id);
    },
    getTemplateDataByTemplateId(templateId) {
      this.axios.get(`/Template/getTemplateData?template_id=${templateId}`)
          .then((res) => {
            console.log(res.data);
            this.activityList = res.data;
            this.$store.state.activityManagement.activityTplTableDialogVisible = false;
          });
    },
  },
};
</script>
