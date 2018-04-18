<template>
  <div class="announcement-library--container">
    <header class="library--filter--content">
      <el-input
        v-model="inputFilterKey"
        class="filter-input"
        placeholder="Input Keywords To Search.."
        size="small"/>
      <el-button
        @click="addAnnouncementHandler"
        class="costa-btn_blue"
        size="small">
        Add +
      </el-button>
    </header>
    <div class="library--body-content">
      <el-table :data="filteredData">
        <el-table-column sortable prop="business_unit" label="Business Unit"></el-table-column>
        <el-table-column sortable prop="title" label="Title"></el-table-column>
        <el-table-column sortable prop="start_time" label="Start Time"></el-table-column>
        <el-table-column sortable prop="end_time" label="End Time"></el-table-column>
        <el-table-column label="Operation">
          <template scope="scope">
            <el-button @click="editActivityHandler(scope)" type="text">Edit</el-button>
            <el-button type="text" class="red">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="Announcement" :visible.sync="announcementDialogVisibile">
      <div class="form-cell--container">
        <div class="form--title">Announcement Title</div>
        <el-input v-model="announcementDialog.title" size="small"></el-input>
      </div>
      <div class="form-cell--container">
        <div class="form--title">Description</div>
        <el-input v-model="announcementDialog.description" type="textarea" size="small"></el-input>
      </div>
      <div class="form-cell--container">
        <p class="form--title">Times</p>
        <el-autocomplete
          @click="select()"
          placeholder="start time"
          v-model="announcementDialog.start_time"
          :fetch-suggestions="queryString"
        ></el-autocomplete>
        <el-autocomplete
          placeholder="end time"
          v-model="announcementDialog.end_time"
          :fetch-suggestions="queryString"
        ></el-autocomplete>
      </div>
      <div class="form-cell--container">
        <el-button class="costa-btn_blue" @click="linkActivityHandler" size="small">
          {{announcementDialog.activity_id ? `ID: ${announcementDialog.activity_id}` : 'Link Activity'}}
        </el-button>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="announcementDialogConfirmHandler" size="small" class="costa-btn_blue">Confirm</el-button>
        <el-button size="small" @click="announcementDialogVisibile = false" class="">Cancel</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
const announcementDialog = {
  title: '',
  description: '',
  start_time: '',
  end_time: '',
  activity_id: '',
};

export default {
  data() {
    return {
      announcementDialog,
      inputFilterKey: '',
      announcementDialogVisibile: false,
      announcements: [{
        business_unit: 'Entertainment',
        title: 'Join the Movie1',
        location: 'Deck 3',
        start_time: '8:00',
        end_time: '10:00',
        card_style: 'Normal',
      }, {
        business_unit: 'Entertainment',
        title: 'Join the Movie2',
        location: 'Deck 1',
        start_time: '8:00',
        end_time: '12:00',
        card_style: 'Compact',
      }, {
        business_unit: 'Food',
        title: 'Join the Movie3',
        location: 'Deck 2',
        start_time: '9:00',
        end_time: '10:00',
        card_style: 'Normal',
      }, {
        business_unit: 'Children',
        title: 'Join the Movie4',
        location: 'Deck 4',
        start_time: '8:00',
        end_time: '10:00',
        card_style: 'Normal',
      }],
    };
  },
  computed: {
    filteredData() {
      const inputFilterKey = this.inputFilterKey && this.inputFilterKey.toLowerCase();
      let data = this.announcements || {};
      if (inputFilterKey) {
        data = data
                .filter(row => Object.keys(row)
                .some(key => String(row[key]).toLowerCase().includes(inputFilterKey)));
      }
      return data;
    },
  },
  mounted() {
    this.getAnnouncementList();
  },
  methods: {
    getAnnouncementList() {
      this.axios.get(`/Announcement/getAnnouncementListByScheduleId?schedule_id=1`)
          .then((res) => {
            this.announcements = res.data;
          });
    },
    addAnnouncementHandler() {
      this.announcementDialogStatus = 'add';
      this.announcementDialogVisibile = true;
      this.generateAnnouncementViewData();
    },
  },
};
</script>

<style lang="less" scoped>
  .library--filter--content {
    padding: .7rem 0;
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    .filter-input {
      width: 14rem;
    }
  }
</style>
