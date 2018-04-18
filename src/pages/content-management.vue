<template>
  <div class="content-management--container">
    <header class="container--header">
      <div class="left-part">
        <b>Trip Code: </b>
        <el-select v-model="selectorValue" placeholder="Please Select" size="small">
          <el-option
            v-for="item in selectorData"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="right-part">
        <el-button class="" size="small" type="primary">Add +</el-button>
      </div>
    </header>
    <div class="schedule-list--content">
      <div class="list-item">
        <div class="title">Day 1 Shanghai</div>
        <div class="date">2018-02-14</div>
      </div>
      <div class="list-item">
        <div class="title">Day 1 Shanghai</div>
        <div class="date">2018-02-14</div>
      </div>
      <div class="list-item">
        <div class="title">Day 1 Shanghai</div>
        <div class="date">2018-02-14</div>
      </div>
    </div>
    <div class="table--container">
      <el-tabs type="border-card">
        <el-tab-pane label="Activities">
          <cmActivitiesTable :tableData="activitiesData" />
        </el-tab-pane>
        <el-tab-pane label="Banners">
          <cmBannersTable :tableData="activitiesData" />
        </el-tab-pane>
        <el-tab-pane label="Announcements">
          <cmAnnouncementsTable :tableData="activitiesData" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import cmActivitiesTable from '../components/cm-activities-table';
import cmBannersTable from '../components/cm-banners-table';
import cmAnnouncementsTable from '../components/cm-announcements-table';

export default {
  data() {
    return {
      selectorData: [{
        value: 'SE20180214',
        label: 'SE20180214',
      }, {
        value: 'SE20180212',
        label: 'SE20180212',
      }, {
        value: 'SE20180217',
        label: 'SE20180217',
      }, {
        value: 'SE20180211',
        label: 'SE20180211',
      }, {
        value: 'SE20180219',
        label: 'SE20180219',
      }],
      selectorValue: 'SE20180211',
      activitiesData: [{
        business_unit: 'Animation',
        title: 'Cruise Welcome Party',
        location: 'Deck 4',
        start_time: '8:00',
        end_time: '9:00',
        card_style: 'Normal',
      }, {
        business_unit: 'Animation',
        title: 'Cruise Welcome Party',
        location: 'Deck 4',
        start_time: '8:00',
        end_time: '9:00',
        card_style: 'Normal',
      }],
    };
  },
  components: {
    cmActivitiesTable,
    cmBannersTable,
    cmAnnouncementsTable,
  },
};
</script>

