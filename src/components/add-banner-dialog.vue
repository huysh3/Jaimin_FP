<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="$store.state.activityManagement.bannerDialogVisible">
      <el-radio-group size="small" v-model="tabPosition" style="margin-bottom: 30px; font-size: 0;">
        <el-radio-button label="info_en">Info(en)</el-radio-button>
        <el-radio-button label="info_cn">Info(cn)</el-radio-button>
        <el-radio-button label="info_jp">Info(jp)</el-radio-button>
        <el-radio-button label="wechat">WechatView</el-radio-button>
      </el-radio-group>
      <div class="block" v-if="tabPosition == 'info_en'">
        <div class="form-cell--container">
          <p class="form--title">Banner Title</p>
          <el-input v-model="bannerDialogData.title" size="small"></el-input>
        </div>
        <div class="form-cell--container">
          <p class="form--title">Location</p>
          <el-input v-model="bannerDialogData.location" size="small" placeholder="Deck"></el-input>
        </div>
        <div class="form-cell--container">
          <p class="form--title">Times</p>
          <el-autocomplete
            placeholder="start time"
            v-model="bannerDialogData.start_time"
            :fetch-suggestions="queryString"
          ></el-autocomplete>
          to
          <el-autocomplete
            placeholder="end time"
            v-model="bannerDialogData.end_time"
            :fetch-suggestions="queryString"
          ></el-autocomplete>
        </div>
        <div class="form-cell--container">
          <!-- <p class="form--title">Link Activity</p> -->
          <el-button
            @click="getLinkActivityList"
            class="costa-btn_blue"
            size="small">
            {{bannerDialogData.activity_id ? 'ID:' + bannerDialogData.activity_id : 'Link Activity'}}
          </el-button>
        </div>
      </div>
      <div class="block" v-if="tabPosition == 'info_cn'">
        <div class="form-cell--container">
          <p class="form--title">Banner Title</p>
          <el-input v-model="bannerDialogData.title_chn" size="small"></el-input>
        </div>
        <div class="form-cell--container">
          <p class="form--title">Location</p>
          <el-input v-model="bannerDialogData.location_chn" size="small"></el-input>
        </div>
      </div>
      <div class="block" v-if="tabPosition == 'info_jp'">
        <div class="form-cell--container">
          <p class="form--title">Banner Title</p>
          <el-input v-model="bannerDialogData.title_jpn" size="small"></el-input>
        </div>
        <div class="form-cell--container">
          <p class="form--title">Location</p>
          <el-input v-model="bannerDialogData.location_jpn" size="small"></el-input>
        </div>
      </div>
      <div class="block" v-if="tabPosition == 'wechat'">
        <section class="image-manage--container">
          <el-row>
            <el-col :span="6">
              <p>Banner Image</p>
              <div>
                <el-upload
                  action="https://costa.wechatify.com/assets/upload"
                  class="avatar-uploader"
                  name="image_url"
                  :show-file-list="false"
                  :http-request="handleUploadRequest">
                  <img
                    @click="uploadOrigin='image_url'"
                    v-if="bannerDialogData.image_url"
                    :src="`${bannerDialogData.image_url}`"
                    class="avatar">
                  <i @click="uploadOrigin='image_url'" v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
            </el-col>
          </el-row>
        </section>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="saveBanner" size="small" class="costa-btn_primary">Save Banner</el-button>
        <el-button @click="bannerDialogVisibile = false;" size="small">Cancel</el-button>
      </div>
    </el-dialog>
    <el-dialog title="Link Activity" :visible.sync="$store.state.activityManagement.linkActivityListDialogVisible">
      <el-table :data="linkActivityList" empty-text="No data">
        <el-table-column sortable prop="activity_id" label="ID"></el-table-column>
        <el-table-column sortable prop="title" label="Title"></el-table-column>
        <el-table-column sortable prop="cost" label="Cost"></el-table-column>
        <el-table-column sortable prop="type" label="Type"></el-table-column>
        <el-table-column label="Operation">
          <template scope="scope">
            <el-button @click="linkActivitySelectHandler(scope)" type="text">Select</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
const bannerDS = {
  banner_id: '',
  title: '',
  title_chn: '',
  title_jpn: '',
  location: '',
  location_chn: '',
  location_jpn: '',
  start_time: '',
  end_time: '',
  image_url: '',
  activity_id: '',
  unit_id: '',
  schedule_id: '',
  change_status: '',
  flag: '',
  time: '',
};

export default {
  props: ['bannerDialogData', 'title', 'mode', 'schedule'],
  data() {
    return {
      linkActivityList: [],
      tabPosition: 'info_en',
      timeList: [{ value: '0:00' }, { value: '0:05' }, { value: '0:10' }, { value: '0:15' }, { value: '0:20' }, { value: '0:25' }, { value: '0:30' }, { value: '0:35' }, { value: '0:40' }, { value: '0:45' }, { value: '0:50' }, { value: '0:55' }, { value: '1:00' }, { value: '1:05' }, { value: '1:10' }, { value: '1:15' }, { value: '1:20' }, { value: '1:25' }, { value: '1:30' }, { value: '1:35' }, { value: '1:40' }, { value: '1:45' }, { value: '1:50' }, { value: '1:55' }, { value: '2:00' }, { value: '2:05' }, { value: '2:10' }, { value: '2:15' }, { value: '2:20' }, { value: '2:25' }, { value: '2:30' }, { value: '2:35' }, { value: '2:40' }, { value: '2:45' }, { value: '2:50' }, { value: '2:55' }, { value: '3:00' }, { value: '3:05' }, { value: '3:10' }, { value: '3:15' }, { value: '3:20' }, { value: '3:25' }, { value: '3:30' }, { value: '3:35' }, { value: '3:40' }, { value: '3:45' }, { value: '3:50' }, { value: '3:55' }, { value: '4:00' }, { value: '4:05' }, { value: '4:10' }, { value: '4:15' }, { value: '4:20' }, { value: '4:25' }, { value: '4:30' }, { value: '4:35' }, { value: '4:40' }, { value: '4:45' }, { value: '4:50' }, { value: '4:55' }, { value: '5:00' }, { value: '5:05' }, { value: '5:10' }, { value: '5:15' }, { value: '5:20' }, { value: '5:25' }, { value: '5:30' }, { value: '5:35' }, { value: '5:40' }, { value: '5:45' }, { value: '5:50' }, { value: '5:55' }, { value: '6:00' }, { value: '6:05' }, { value: '6:10' }, { value: '6:15' }, { value: '6:20' }, { value: '6:25' }, { value: '6:30' }, { value: '6:35' }, { value: '6:40' }, { value: '6:45' }, { value: '6:50' }, { value: '6:55' }, { value: '7:00' }, { value: '7:05' }, { value: '7:10' }, { value: '7:15' }, { value: '7:20' }, { value: '7:25' }, { value: '7:30' }, { value: '7:35' }, { value: '7:40' }, { value: '7:45' }, { value: '7:50' }, { value: '7:55' }, { value: '8:00' }, { value: '8:05' }, { value: '8:10' }, { value: '8:15' }, { value: '8:20' }, { value: '8:25' }, { value: '8:30' }, { value: '8:35' }, { value: '8:40' }, { value: '8:45' }, { value: '8:50' }, { value: '8:55' }, { value: '9:00' }, { value: '9:05' }, { value: '9:10' }, { value: '9:15' }, { value: '9:20' }, { value: '9:25' }, { value: '9:30' }, { value: '9:35' }, { value: '9:40' }, { value: '9:45' }, { value: '9:50' }, { value: '9:55' }, { value: '10:00' }, { value: '10:05' }, { value: '10:10' }, { value: '10:15' }, { value: '10:20' }, { value: '10:25' }, { value: '10:30' }, { value: '10:35' }, { value: '10:40' }, { value: '10:45' }, { value: '10:50' }, { value: '10:55' }, { value: '11:00' }, { value: '11:05' }, { value: '11:10' }, { value: '11:15' }, { value: '11:20' }, { value: '11:25' }, { value: '11:30' }, { value: '11:35' }, { value: '11:40' }, { value: '11:45' }, { value: '11:50' }, { value: '11:55' }, { value: '12:00' }, { value: '12:05' }, { value: '12:10' }, { value: '12:15' }, { value: '12:20' }, { value: '12:25' }, { value: '12:30' }, { value: '12:35' }, { value: '12:40' }, { value: '12:45' }, { value: '12:50' }, { value: '12:55' }, { value: '13:00' }, { value: '13:05' }, { value: '13:10' }, { value: '13:15' }, { value: '13:20' }, { value: '13:25' }, { value: '13:30' }, { value: '13:35' }, { value: '13:40' }, { value: '13:45' }, { value: '13:50' }, { value: '13:55' }, { value: '14:00' }, { value: '14:05' }, { value: '14:10' }, { value: '14:15' }, { value: '14:20' }, { value: '14:25' }, { value: '14:30' }, { value: '14:35' }, { value: '14:40' }, { value: '14:45' }, { value: '14:50' }, { value: '14:55' }, { value: '15:00' }, { value: '15:05' }, { value: '15:10' }, { value: '15:15' }, { value: '15:20' }, { value: '15:25' }, { value: '15:30' }, { value: '15:35' }, { value: '15:40' }, { value: '15:45' }, { value: '15:50' }, { value: '15:55' }, { value: '16:00' }, { value: '16:05' }, { value: '16:10' }, { value: '16:15' }, { value: '16:20' }, { value: '16:25' }, { value: '16:30' }, { value: '16:35' }, { value: '16:40' }, { value: '16:45' }, { value: '16:50' }, { value: '16:55' }, { value: '17:00' }, { value: '17:05' }, { value: '17:10' }, { value: '17:15' }, { value: '17:20' }, { value: '17:25' }, { value: '17:30' }, { value: '17:35' }, { value: '17:40' }, { value: '17:45' }, { value: '17:50' }, { value: '17:55' }, { value: '18:00' }, { value: '18:05' }, { value: '18:10' }, { value: '18:15' }, { value: '18:20' }, { value: '18:25' }, { value: '18:30' }, { value: '18:35' }, { value: '18:40' }, { value: '18:45' }, { value: '18:50' }, { value: '18:55' }, { value: '19:00' }, { value: '19:05' }, { value: '19:10' }, { value: '19:15' }, { value: '19:20' }, { value: '19:25' }, { value: '19:30' }, { value: '19:35' }, { value: '19:40' }, { value: '19:45' }, { value: '19:50' }, { value: '19:55' }, { value: '20:00' }, { value: '20:05' }, { value: '20:10' }, { value: '20:15' }, { value: '20:20' }, { value: '20:25' }, { value: '20:30' }, { value: '20:35' }, { value: '20:40' }, { value: '20:45' }, { value: '20:50' }, { value: '20:55' }, { value: '21:00' }, { value: '21:05' }, { value: '21:10' }, { value: '21:15' }, { value: '21:20' }, { value: '21:25' }, { value: '21:30' }, { value: '21:35' }, { value: '21:40' }, { value: '21:45' }, { value: '21:50' }, { value: '21:55' }, { value: '22:00' }, { value: '22:05' }, { value: '22:10' }, { value: '22:15' }, { value: '22:20' }, { value: '22:25' }, { value: '22:30' }, { value: '22:35' }, { value: '22:40' }, { value: '22:45' }, { value: '22:50' }, { value: '22:55' }, { value: '23:00' }, { value: '23:05' }, { value: '23:10' }, { value: '23:15' }, { value: '23:20' }, { value: '23:25' }, { value: '23:30' }, { value: '23:35' }, { value: '23:40' }, { value: '23:45' }, { value: '23:50' }, { value: '23:55' }],
    };
  },
  mounted() {
    if (this.mode === 'add') {
      this.bannerDialogData = JSON.parse(JSON.stringify(bannerDS));
    }
    this.bannerDialogData.schedule_id = this.schedule.schedule_id;
  },
  methods: {
    createFilter(queryString) {
      return restaurant => (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
    },
    queryString(queryString, cb) {
      const results = queryString ? this.timeList.filter(this.createFilter(queryString)) : this.timeList;
      cb(results);
    },
    handleUploadRequest(req) {
      console.log(this.uploadOrigin);
      const uploadFile = req.file;
      const param = new FormData();
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
      };

      param.append('filename', uploadFile, `${(new Date()).getTime()}${uploadFile.name}`);

      this.axios.post('https://costa.wechatify.com/assets/upload', param, config)
        .then((res) => {
          // this.bannerDialogData[`${this.uploadOrigin}`] = res.Name;
          this.$set(this.bannerDialogData, `${this.uploadOrigin}`, res.Name);
          console.log(this.bannerDialogData);
        });
    },
    getLinkActivityList() {
      // 获取linked activity列表
      this.axios.get(`/Activity/getActivityListByScheduleId?schedule_id=2`)
          .then((res) => {
            this.linkActivityList = res.data;
            this.$store.state.activityManagement.linkActivityListDialogVisible = true;
          });
    },
    linkActivitySelectHandler(scope) {
      this.bannerDialogData.activity_id = scope.row.activity_id;
      this.$store.state.activityManagement.linkActivityListDialogVisible = false;
    },
    saveBanner() {
      debugger;
      this.$emit('saveBannerDialog', this.bannerDialogData);
      this.axios.post(`/Banner/addBanner`, this.bannerDialogData)
          .then((res) => {
            console.log(res);
          });
    },
  },
};
</script>

<style lang="less" scoped>
  .avatar {
    object-fit: contain;
  }
</style>
