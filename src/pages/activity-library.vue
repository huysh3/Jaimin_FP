<template>
  <div class="activity-library--container">
    <header class="library--filter--content">
      <el-input
        v-model="inputFilterKey"
        class="filter-input"
        placeholder="Input Keywords To Search.."
        size="small"/>
      <el-button
        @click="addActivityHandler"
        class="costa-btn_blue"
        size="small">
        Add +
      </el-button>
    </header>
    <div class="library--body-content">
      <el-table
        v-loading="tableLoading"
        :data="filteredData">
        <el-table-column
          prop="business_unit"
          label="Business Unit" />
        <el-table-column sortable prop="title" label="Title" />
        <el-table-column sortable prop="location" label="Location" />
        <el-table-column sortable prop="start_time" label="Start Time">
          <template scope="scope">
            <i class="el-icon-time" style="padding-right: .4rem;"/>{{scope.row.start_time}}
          </template>
        </el-table-column>
        <el-table-column sortable prop="end_time" label="End Time">
          <template scope="scope">
            <i class="el-icon-time" style="padding-right: .4rem;"/>{{scope.row.end_time}}
          </template>
        </el-table-column>
        <el-table-column sortable prop="type" label="Card Style"></el-table-column>
        <el-table-column label="Operation">
          <template scope="scope">
            <el-button @click="editActivityHandler(scope)" type="text">Edit</el-button>
            <el-button type="text" class="red">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <activityInfoInputDialog />
  </div>
</template>

<script>
import activityInfoInputDialog from '../components/activity-info-input-dialog';

export default {
  data() {
    return {
      tableLoading: false,
      activities: [{
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
      inputFilterKey: '',
    };
  },
  components: {
    activityInfoInputDialog,
  },
  mounted() {
    this.tableLoading = true;
    this.getActivityList();
  },
  computed: {
    filteredData() {
      const inputFilterKey = this.inputFilterKey && this.inputFilterKey.toLowerCase();
      let data = this.activities || {};
      if (inputFilterKey) {
        data = data
                .filter(row => Object.keys(row)
                .some(key => String(row[key]).toLowerCase().includes(inputFilterKey)));
      }
      return data;
    },
  },
  methods: {
    filterTag(value, row) {
      return row.tag === value;
    },
    filterHandler(value, row, column) {
      const { property } = column;
      return row[property] === value;
    },
    getActivityList() {
      this.axios.get(`/Activity/getActivityListByUnitId?unit_id=74`)
        .then((res) => {
          this.activities = res.data;
          this.tableLoading = false;
        });
    },
    addActivityHandler() {
      // this.$store.state.activityManagement.activityInfoInputDialogVisible = true;
    },
    editActivityHandler(scope) {
      this.$store.state.activityManagement.activityInfoInputDialogVisible = true;
      console.log(scope.row);
    },
  },
};
</script>

<style lang="less" scoped>
  .library--filter--content {
    display: flex;
    justify-content: space-between;
    .filter-input {
      width: 14rem;
      padding-right: 1rem;
    }
    .costa-btn_blue {
      padding: .4rem 1.4rem;
    }
  }
  .library--filter--content {
    padding: .7rem 0;
    border-bottom: 1px solid #ccc;
  }
  .library--body-content {
    padding-top: .7rem;
  }
</style>
