<template>
  <div>
    <form id="form">
      <input id="js-file" type="file" style="display:none;"/>
    </form>
    <div class="banner-list--container">
      <section class="day-list--container">
        <div
          class="day--container"
          :class="item.schedule_id == scheduleId ? 'active' : ''"
          v-for="(item, index) in scheduleList"
          :key="index"
          @click="getbannerScheduleInfo(item.schedule_id, $route.params.unit_id)">
          <div class="day--title">{{item.name}}</div>
          <div class="day--index">Day {{index + 1}}</div>
          <img class="activity--tag" src="http://images-1254092492.cosgz.myqcloud.com/2017-11-07-084021.png" alt="">
        </div>
      </section>
      <el-table :data="bannerList" style="width: 100%" empty-text="No data">
        <el-table-column sortable prop="title" label="Title"></el-table-column>
        <el-table-column sortable prop="banner_id" label="ID"></el-table-column>
        <el-table-column sortable prop="location" label="Location"></el-table-column>
        <el-table-column sortable prop="start_time" label="Start time">
          <template scope="scope">
            {{`${scope.row.start_time.split(':')[0]}:${scope.row.start_time.split(':')[1]}`}}
          </template>
        </el-table-column>
        <el-table-column sortable prop="end_time" label="End time">
          <template scope="scope">
            {{`${scope.row.end_time.split(':')[0]}:${scope.row.end_time.split(':')[1]}`}}
          </template>
        </el-table-column>
        <el-table-column sortable prop="activity_id" label="Linked Activity"></el-table-column>
        <el-table-column label="Operation" width="100">
          <template scope="scope">
            <el-button @click="deleteBannerHandle(scope)" style="color: red;" type="text" size="small">Delete</el-button>
            <el-button @click="editBanner(scope)" type="text" size="small">Edit</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="options--container">
        <el-button @click="addBanner" size="small">Add Banner +</el-button>
        <el-button @click="changeTemplateHandler" class="costa-btn_blue" size="small">Change Template</el-button>
        <el-button @click="saveContentHandler" class="costa-btn_blue" size="small">Save</el-button>
        <el-button @click="saveTemplateHandler" class="costa-btn_primary" size="small">Save as a New Template</el-button>
        <el-button @click="$router.go(-1)" size="small">Cancel</el-button>
      </div>
    </div>

    <!-- edit dialog -->
    <el-dialog title="Banner" :visible.sync="bannerDialogVisibile">
      <el-radio-group size="small" v-model="tabPosition" style="margin-bottom: 30px; font-size: 0;">
        <el-radio-button label="info">Info</el-radio-button>
        <el-radio-button label="wechat">WechatView</el-radio-button>
      </el-radio-group>
      <div class="block" v-if="tabPosition == 'info'">
        <div class="form-cell--container">
          <p class="form--title">Banner Title</p>
          <el-input v-model="bannerDialog.title" size="small"></el-input>
        </div>
        <div class="form-cell--container">
          <p class="form--title">Location</p>
          <el-input v-model="bannerDialog.location" size="small" placeholder="Deck"></el-input>
        </div>
        <div class="form-cell--container">
          <p class="form--title">Times</p>
          <el-autocomplete
            placeholder="start time"
            v-model="bannerDialog.start_time"
            :fetch-suggestions="queryString"
          ></el-autocomplete>
          <el-autocomplete
            placeholder="end time"
            v-model="bannerDialog.end_time"
            :fetch-suggestions="queryString"
          ></el-autocomplete>
        </div>
        <div class="form-cell--container">
          <!-- <p class="form--title">Link Activity</p> -->
          <el-button class="costa-btn_blue" @click="linkActivityHandler" size="small">
            {{bannerDialog.activity_id ? `ID: ${bannerDialog.activity_id}` : 'Link Activity'}}
          </el-button>
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
                  :http-request="handleUploadRequest"
                  :before-upload="beforeImgUpload">
                  <img @click="uploadOrigin='image_url'" v-if="bannerDialog.image_url" :src="`${bannerDialog.image_url}`" class="avatar">
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

    <!-- template dialog -->
    <el-dialog title="Change Template" :visible.sync="changeTemplateDialogVisibile">
      <el-table :data="templateList" stripe style="width: 100%" empty-text="No data">
        <el-table-column sortable prop="key_words" label="Key Words"></el-table-column>
        <el-table-column sortable prop="ship_id" label="Ship Id"></el-table-column>
        <!-- <el-table-column sortable prop="template_id" label="Template ID"></el-table-column> -->
        <el-table-column sortable prop="type" label="Type"></el-table-column>
        <el-table-column sortable prop="unit_id" label="Unit ID"></el-table-column>
        <el-table-column label="Options">
          <template scope="scope">
            <el-button @click="selectTemplate(scope)" type="text">Confirm</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- link activity dialog -->
    <el-dialog title="Link Activity" :visible.sync="activityListDialogVisibile">
      <el-table :data="activityList" empty-text="No data">
        <el-table-column sortable prop="activity_id" label="ID"></el-table-column>
        <el-table-column sortable prop="title" label="Title"></el-table-column>
        <el-table-column sortable prop="cost" label="Cost"></el-table-column>
        <el-table-column sortable prop="type" label="Type"></el-table-column>
        <el-table-column label="Operation">
          <template scope="scope">
            <el-button @click="linkActivitySelectHandler(scope.row)" type="text">Select</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
  import $ from 'jquery';
  import Cos from 'cos-js-sdk-v4';
  import blockerSelector from './blocker-selector';

  const myFolder = '/Costa-CMS-1/';
  let cos;

  const errorCallBack = function (result) {
    console.log('request error:', result && result.message);
    $('#result').val(result.responseText || 'error');
  };

  const progressCallBack = function (curr, sha1) {
    const sha1CheckProgress = `${((sha1 * 100).toFixed(2) || 100)}%`;
    const uploadProgress = `${((curr || 0) * 100).toFixed(2)}%`;
    const msg = `upload progress:${uploadProgress}; sha1 check:${sha1CheckProgress}.`;
    console.log(msg);
    $('#result').val(msg);
  };

  const taskReady = function (taskId) {
    console.log(taskId);
  };
  export default {
    data() {
      return {
        scheduleList: [],
        bannerList: [],
        activityList: [],
        templateList: [],
        bannerDialog: '',
        changeTemplateDialogVisibile: false,
        bannerDialogVisibile: false,
        tabPosition: 'info',
        activityListDialogVisibile: false,
        timeList: [{ value: '0:00' }, { value: '0:05' }, { value: '0:10' }, { value: '0:15' }, { value: '0:20' }, { value: '0:25' }, { value: '0:30' }, { value: '0:35' }, { value: '0:40' }, { value: '0:45' }, { value: '0:50' }, { value: '0:55' }, { value: '1:00' }, { value: '1:05' }, { value: '1:10' }, { value: '1:15' }, { value: '1:20' }, { value: '1:25' }, { value: '1:30' }, { value: '1:35' }, { value: '1:40' }, { value: '1:45' }, { value: '1:50' }, { value: '1:55' }, { value: '2:00' }, { value: '2:05' }, { value: '2:10' }, { value: '2:15' }, { value: '2:20' }, { value: '2:25' }, { value: '2:30' }, { value: '2:35' }, { value: '2:40' }, { value: '2:45' }, { value: '2:50' }, { value: '2:55' }, { value: '3:00' }, { value: '3:05' }, { value: '3:10' }, { value: '3:15' }, { value: '3:20' }, { value: '3:25' }, { value: '3:30' }, { value: '3:35' }, { value: '3:40' }, { value: '3:45' }, { value: '3:50' }, { value: '3:55' }, { value: '4:00' }, { value: '4:05' }, { value: '4:10' }, { value: '4:15' }, { value: '4:20' }, { value: '4:25' }, { value: '4:30' }, { value: '4:35' }, { value: '4:40' }, { value: '4:45' }, { value: '4:50' }, { value: '4:55' }, { value: '5:00' }, { value: '5:05' }, { value: '5:10' }, { value: '5:15' }, { value: '5:20' }, { value: '5:25' }, { value: '5:30' }, { value: '5:35' }, { value: '5:40' }, { value: '5:45' }, { value: '5:50' }, { value: '5:55' }, { value: '6:00' }, { value: '6:05' }, { value: '6:10' }, { value: '6:15' }, { value: '6:20' }, { value: '6:25' }, { value: '6:30' }, { value: '6:35' }, { value: '6:40' }, { value: '6:45' }, { value: '6:50' }, { value: '6:55' }, { value: '7:00' }, { value: '7:05' }, { value: '7:10' }, { value: '7:15' }, { value: '7:20' }, { value: '7:25' }, { value: '7:30' }, { value: '7:35' }, { value: '7:40' }, { value: '7:45' }, { value: '7:50' }, { value: '7:55' }, { value: '8:00' }, { value: '8:05' }, { value: '8:10' }, { value: '8:15' }, { value: '8:20' }, { value: '8:25' }, { value: '8:30' }, { value: '8:35' }, { value: '8:40' }, { value: '8:45' }, { value: '8:50' }, { value: '8:55' }, { value: '9:00' }, { value: '9:05' }, { value: '9:10' }, { value: '9:15' }, { value: '9:20' }, { value: '9:25' }, { value: '9:30' }, { value: '9:35' }, { value: '9:40' }, { value: '9:45' }, { value: '9:50' }, { value: '9:55' }, { value: '10:00' }, { value: '10:05' }, { value: '10:10' }, { value: '10:15' }, { value: '10:20' }, { value: '10:25' }, { value: '10:30' }, { value: '10:35' }, { value: '10:40' }, { value: '10:45' }, { value: '10:50' }, { value: '10:55' }, { value: '11:00' }, { value: '11:05' }, { value: '11:10' }, { value: '11:15' }, { value: '11:20' }, { value: '11:25' }, { value: '11:30' }, { value: '11:35' }, { value: '11:40' }, { value: '11:45' }, { value: '11:50' }, { value: '11:55' }, { value: '12:00' }, { value: '12:05' }, { value: '12:10' }, { value: '12:15' }, { value: '12:20' }, { value: '12:25' }, { value: '12:30' }, { value: '12:35' }, { value: '12:40' }, { value: '12:45' }, { value: '12:50' }, { value: '12:55' }, { value: '13:00' }, { value: '13:05' }, { value: '13:10' }, { value: '13:15' }, { value: '13:20' }, { value: '13:25' }, { value: '13:30' }, { value: '13:35' }, { value: '13:40' }, { value: '13:45' }, { value: '13:50' }, { value: '13:55' }, { value: '14:00' }, { value: '14:05' }, { value: '14:10' }, { value: '14:15' }, { value: '14:20' }, { value: '14:25' }, { value: '14:30' }, { value: '14:35' }, { value: '14:40' }, { value: '14:45' }, { value: '14:50' }, { value: '14:55' }, { value: '15:00' }, { value: '15:05' }, { value: '15:10' }, { value: '15:15' }, { value: '15:20' }, { value: '15:25' }, { value: '15:30' }, { value: '15:35' }, { value: '15:40' }, { value: '15:45' }, { value: '15:50' }, { value: '15:55' }, { value: '16:00' }, { value: '16:05' }, { value: '16:10' }, { value: '16:15' }, { value: '16:20' }, { value: '16:25' }, { value: '16:30' }, { value: '16:35' }, { value: '16:40' }, { value: '16:45' }, { value: '16:50' }, { value: '16:55' }, { value: '17:00' }, { value: '17:05' }, { value: '17:10' }, { value: '17:15' }, { value: '17:20' }, { value: '17:25' }, { value: '17:30' }, { value: '17:35' }, { value: '17:40' }, { value: '17:45' }, { value: '17:50' }, { value: '17:55' }, { value: '18:00' }, { value: '18:05' }, { value: '18:10' }, { value: '18:15' }, { value: '18:20' }, { value: '18:25' }, { value: '18:30' }, { value: '18:35' }, { value: '18:40' }, { value: '18:45' }, { value: '18:50' }, { value: '18:55' }, { value: '19:00' }, { value: '19:05' }, { value: '19:10' }, { value: '19:15' }, { value: '19:20' }, { value: '19:25' }, { value: '19:30' }, { value: '19:35' }, { value: '19:40' }, { value: '19:45' }, { value: '19:50' }, { value: '19:55' }, { value: '20:00' }, { value: '20:05' }, { value: '20:10' }, { value: '20:15' }, { value: '20:20' }, { value: '20:25' }, { value: '20:30' }, { value: '20:35' }, { value: '20:40' }, { value: '20:45' }, { value: '20:50' }, { value: '20:55' }, { value: '21:00' }, { value: '21:05' }, { value: '21:10' }, { value: '21:15' }, { value: '21:20' }, { value: '21:25' }, { value: '21:30' }, { value: '21:35' }, { value: '21:40' }, { value: '21:45' }, { value: '21:50' }, { value: '21:55' }, { value: '22:00' }, { value: '22:05' }, { value: '22:10' }, { value: '22:15' }, { value: '22:20' }, { value: '22:25' }, { value: '22:30' }, { value: '22:35' }, { value: '22:40' }, { value: '22:45' }, { value: '22:50' }, { value: '22:55' }, { value: '23:00' }, { value: '23:05' }, { value: '23:10' }, { value: '23:15' }, { value: '23:20' }, { value: '23:25' }, { value: '23:30' }, { value: '23:35' }, { value: '23:40' }, { value: '23:45' }, { value: '23:50' }, { value: '23:55' }],
      };
    },
    components: {
      'blocker-selector': blockerSelector,
    },
    computed: {
      bannerStartTime: {
        get() {
          if (!this.bannerDialog.start_time) {
            return '';
          }
          const idxTime = new Date();
          idxTime.setHours(this.bannerDialog.start_time.split(':')[0]);
          idxTime.setMinutes(this.bannerDialog.start_time.split(':')[1]);
          idxTime.setSeconds(this.bannerDialog.start_time.split(':')[2]);
          return idxTime;
        },
        set(val) {
          this.bannerDialog.start_time = `${val.getHours()}:${val.getMinutes()}:${val.getSeconds()}`;
        },
      },
      bannerEndTime: {
        get() {
          if (!this.bannerDialog.end_time) {
            return '';
          }
          const idxTime = new Date();
          idxTime.setHours(this.bannerDialog.end_time.split(':')[0]);
          idxTime.setMinutes(this.bannerDialog.end_time.split(':')[1]);
          idxTime.setSeconds(this.bannerDialog.end_time.split(':')[2]);
          return idxTime;
        },
        set(val) {
          this.bannerDialog.end_time = `${val.getHours()}:${val.getMinutes()}:${val.getSeconds()}`;
        },
      },
    },
    mounted() {
      this.configUpload();
      this.shipId = this.$route.params.ship_id;
      this.unitId = this.$route.params.unit_id;
      this.tripId = this.$route.params.trip_id;
      this.scheduleId = this.$route.params.schedule_id;
      this.getScheduleListByTripId(this.$route.params.trip_id);
      this.getbannerScheduleInfo(this.$route.params.schedule_id, this.$route.params.unit_id);
      this.getTemplateList(
        this.$route.params.ship_id,
        this.$route.fullPath.split('-')[0].split('/')[1],
        this.$route.params.unit_id,
      );
    },
    methods: {
      queryString(queryString, cb) {
        const results = queryString ? this.timeList.filter(this.createFilter(queryString)) : this.timeList;
        cb(results);
      },
      createFilter(queryString) {
        return restaurant => (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      },
      configUpload() {
        const that = this;
        cos = new Cos({
          appid: '1254092492',
          bucket: 'costacms',
          region: 'gz',
          getAppSign(callback) {
            // 方法一（推荐线上使用）：搭建鉴权服务器，构造请求参数获取签名，推荐实际线上业务使用，优点是安全性好，不会暴露自己的私钥
            // $.get('https://18546245.qcloud.la/CMS/Bucket/makeSign', callback);
            that.axios.get('/Bucket/makeSign')
                .then((res) => {
                  console.log(res.data);
                  callback(res.data);
                });
          },
        });
      },
      uploadImg(ori) {
        $('#js-file').off('change').on('change', (e) => {
          const file = e.target.files[0];
          // insertOnly==0 表示允许覆盖文件 1表示不允许
          cos.uploadFile(
            (res) => {
              // console.log(res.data.access_url);
              this.bannerDialog[ori] = res.data.access_url;
              console.log(this.imgs);
            },
            errorCallBack,
            progressCallBack,
            'costacms',
            myFolder + file.name,
            file,
            0,
            taskReady,
          );
          $('#form')[0].reset();
          return false;
        });
        setTimeout(() => {
          $('#js-file').click();
        }, 0);
        return false;
      },
      getTemplateList(shipId, type, unitId) {
        this.axios.get(`/Template/getTemplateList?ship_id=${shipId}&type=${type}&unit_id=${unitId}`)
            .then((res) => {
              this.templateList = res.data;
            });
      },
      getScheduleListByTripId(tripId) {
        this.axios.get(`/Schedule/getScheduleListByTripId?trip_id=${tripId}`)
            .then((res) => {
              console.log(res.data);
              this.scheduleList = res.data;
            });
      },
      getbannerScheduleInfo(scheduleId, unitId) {
        this.scheduleId = scheduleId;
        this.axios.get(`/Banner/getBannerScheduleInfo?schedule_id=${scheduleId}&unit_id=${unitId}`)
            .then((res) => {
              this.bannerList = res.data;
            });
      },
      editBanner(scope) {
        this.bannerDialogStatus = 'edit';
        console.log(scope);
        this.editIndex = scope.row.time;
        this.bannerDialog = JSON.parse(JSON.stringify(scope.row));
        this.bannerDialogVisibile = true;
      },
      addBanner() {
        this.bannerDialogStatus = 'add';
        this.axios.get('/Banner/generateBannerViewData')
            .then((res) => {
              this.bannerDialog = res.data;
              console.log(res.data);
              this.bannerDialogVisibile = true;
            });
      },
      saveBanner() {
        if (!this.bannerDialog.title) { this.$message.error('Please Input Activity Title'); return false; }
        if (!this.bannerDialog.location) { this.$message.error('Please Input Location'); return false; }
        if (!this.bannerDialog.start_time) { this.$message.error('Please Input Start Time'); return false; }
        if (!this.bannerDialog.end_time) { this.$message.error('Please Input End Time'); return false; }
        if (this.bannerDialogStatus === 'add') {
          this.bannerList.push(this.bannerDialog);
        } else {
          this.bannerList.map((item, $index) => {
            if (item.time === this.editIndex) {
              this.$set(this.bannerList, $index, this.bannerDialog);
            }
            return true;
          });
        }
        this.bannerDialogVisibile = false;
        return true;
      },
      changeTemplateHandler() {
        this.changeTemplateDialogVisibile = true;
        this.getTemplateList(
          this.shipId,
          this.$route.fullPath.split('-')[0].split('/')[1],
          this.unitId,
        );
      },
      saveTemplateHandler() {
        this.$prompt('Input Keywords:', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputErrorMessage: 'Illegal Input',
        }).then(({ value }) => {
          this.saveAsNewTemplate({
            schedule_id: this.scheduleId,
            ship_id: this.shipId,
            key_words: value,
            unit_id: this.unitId,
            type: this.$route.fullPath.split('-')[0].split('/')[1],
            content_list: this.bannerList,
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Input Cancel',
          });
        });
      },
      saveAsNewTemplate(postData) {
        this.axios.post('Template/saveAsNewTemplate', postData)
            .then((res) => { console.log(res.data); });
      },
      selectTemplate(scope) {
        this.axios.get(`/Template/getTemplateData?template_id=${scope.row.template_id}`)
            .then((res) => {
              this.bannerList = res.data;
              this.changeTemplateDialogVisibile = false;
            });
      },
      saveContentHandler() {
        this.saveContent({
          schedule_id: this.$route.params.schedule_id,
          ship_id: this.$route.params.ship_id,
          unit_id: this.$route.params.unit_id,
          type: this.$route.fullPath.split('-')[0].split('/')[1],
          content_list: this.bannerList,
        });
      },
      saveContent(postData) {
        this.axios.post('Template/saveContent', postData)
            .then((res) => { console.log(res.data); });
      },
      linkActivityHandler() {
        this.activityListDialogVisibile = true;
        this.getActivityListByUnitId(this.unitId);
      },
      getActivityListByUnitId(unitId) {
        this.axios.get(`Activity/getActivityScheduleInfo?schedule_id=${this.scheduleId}&unit_id=${unitId}`)
            .then((res) => {
              console.log(res.data);
              this.activityList = res.data;
            });
      },
      linkActivitySelectHandler(row) {
        console.log(row);
        this.activityListDialogVisibile = false;
        this.bannerDialog.activity_id = row.activity_id;
      },
      deleteBannerHandle(scope) {
        this.$confirm('This operation will not be able to recover, Go on?', 'Tips', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'error',
        }).then(() => {
          this.bannerList.map((item, $index) => {
            if (item.time === scope.row.time) {
              this.bannerList.splice($index, 1);
            }
            return true;
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Canceled',
          });
        });
      },
      beforeImgUpload() {
        console.log('beforeImgUpload');
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
            this.bannerDialog[`${this.uploadOrigin}`] = res.Name;
            console.log(this.bannerDialog);
          });
      },
    },
  };
</script>
