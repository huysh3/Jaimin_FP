<template>
  <div class="activities-list--container">
    <form id="form">
      <input id="js-file" type="file" style="display:none;"/>
    </form>
    <blocker-selector
      v-if="!selectDone"
      @setSchedule="setSchedule"
      @setUnit="setUnit"
      @setShip="setShip">
    </blocker-selector>
    <div class="announcement-list--container" v-if="selectDone">
      <section class="day-list--container">
        <div
          class="day--container"
          :class="item.schedule_id == scheduleId ? 'active' : ''"
          v-for="(item, index) in scheduleList"
          :key="index"
          @click="getActivityListByScheduleId(item.schedule_id, unitId)">
          <div class="day--title">{{item.name}}</div>
          <div class="day--index">Day {{index + 1}}</div>
          <img class="activity--tag" src="http://images-1254092492.cosgz.myqcloud.com/2017-11-07-084021.png" alt="">
        </div>
      </section>
      <el-table :data="activityList" empty-text="Temporarily no data">
        <el-table-column prop="title" label="Title"></el-table-column>
        <el-table-column prop="activity_id" label="ID" width="150"></el-table-column>
        <el-table-column prop="start_time" label="Start time"></el-table-column>
        <el-table-column prop="end_time" label="End time"></el-table-column>
        <el-table-column prop="type" label="Type"></el-table-column>
        <el-table-column label="Operation" width="100">
          <template scope="scope">
            <el-button style="color: red;" @click="deleteActiveHandle(scope)" type="text" size="small">Delete</el-button>
            <el-button @click="editActiveHandle(scope)" type="text" size="small">Edit</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="options--container">
        <el-button @click="showActivityPool" size="small">Add Activity +</el-button>
        <el-button @click="saveContentHandler" class="costa-btn_blue" size="small">Save</el-button>
        <el-button @click="changeTemplateHandler" class="costa-btn_blue" size="small">Change Template</el-button>
        <el-button @click="saveTemplateHandler" class="costa-btn_primary" size="small">Save as a New Template</el-button>
        <el-button size="small">Cancel</el-button>
      </div>
    </div>
    <el-dialog title="Activity" :visible.sync="activityDialogVisibile">
      <el-select size="small" class="activity--selector" v-model="activityModal.type" placeholder="Select">
        <el-option
          v-for="item in activityTypeList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <div>
        <el-radio-group size="small"  v-model="activityTabStatus">
          <el-radio-button label="info"></el-radio-button>
          <el-radio-button label="wechatView"></el-radio-button>
        </el-radio-group>
      </div>
      <div v-if="activityTabStatus == 'info'">
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="form-cell--container">
              <div class="form--title">Activity Title</div>
              <el-input v-model="activityModal.title" size="small"></el-input>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="form-cell--container">
              <div class="form--title">Cost</div>
              <el-input v-model="activityModal.cost" size="small"></el-input>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="form-cell--container">
              <div class="form--title">Location</div>
              <el-input v-model="activityModal.location" size="small"></el-input>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="form-cell--container">
              <div class="form--title">Description</div>
              <el-input v-model="activityModal.description" type="textarea" size="small"></el-input>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="form-cell--container">
              <div class="form--title">Requirements</div>
              <el-input v-model="activityModal.requirements" type="textarea" size="small"></el-input>
            </div>
          </el-col>
        </el-row>
        <div class="form-cell--container">
          <p class="form--title">Times</p>
          <el-time-picker
            v-model="activityStartTime"
            placeholder="Start Time">
          </el-time-picker>
          <el-time-picker
            v-model="activityEndTime"
            placeholder="End Time">
          </el-time-picker>
        </div>
        <!-- <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox> -->
        <!-- <div style="margin: 15px 0;"></div> -->
        <!-- <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange"> -->
          <el-checkbox
            v-model="activityModal[cls]"
            v-for="(cls, $index) in classList"
            :label="cls"
            :key="$index"
            true-label="1"
            false-label="0">
              {{cls}}
          </el-checkbox>
        <!-- </el-checkbox-group> -->
      </div>
      <div v-if="activityTabStatus == 'wechatView'">
        <section class="image-manage--container">
          <el-row>
            <el-col :span="6" class="upload-img--container">
              <div class="upload-img--title">Card Image</div>
              <img @click="uploadImg('card_image')" :src="activityModal.card_image || 'https://ws1.sinaimg.cn/large/006tKfTcgy1fke3ewimi2j30b30b474h.jpg'" class="uplaod--btn"></img>
            </el-col>
            <el-col :span="6" class="upload-img--container">
              <div class="upload-img--title">Page Image</div>
              <img @click="uploadImg('page_image')" :src="activityModal.page_image || 'https://ws1.sinaimg.cn/large/006tKfTcgy1fke3ewimi2j30b30b474h.jpg'" class="uplaod--btn"></img>
            </el-col>
          </el-row>
        </section>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="saveActivityToList()" size="small" class="costa-btn_blue">Confirm</el-button>
        <el-button size="small" @click="activityDialogVisibile = false" class="">Cancel</el-button>
      </div>
    </el-dialog>
    <!-- Change Template Dialog -->
    <el-dialog title="Change Template" :visible.sync="changeTemplateDialogVisibile">
      <el-table :data="templateList" stripe style="width: 100%" empty-text="Temporarily no data">
        <el-table-column prop="key_words" label="key_words"></el-table-column>
        <el-table-column prop="ship_id" label="ship_id"></el-table-column>
        <el-table-column prop="template_id" label="template_id"></el-table-column>
        <el-table-column prop="type" label="type"></el-table-column>
        <el-table-column prop="unit_id" label="unit_id"></el-table-column>
        <el-table-column prop="unit_id" label="Options">
          <template scope="scope">
            <el-button @click="selectTemplate(scope)" type="text">Confirm</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- Activity Pool Dialog -->
    <el-dialog title="Activities Pool" :visible.sync="activityPoolDialogVisibile">
      <div class="form-cell--container">
        <div class="form--title">Filter</div>
        <el-input v-model="activityPoolFilterKey" size="small" placeholder="Input to Search.."></el-input>
        <el-button @click="addActivityHandler" class="costa-btn_blue" size="small">Create Activity</el-button>
      </div>
      <el-table :data="filteredData" style="width: 100%" empty-text="Temporarily no data">
        <el-table-column prop="title" label="Title"></el-table-column>
        <el-table-column prop="type" label="Type"></el-table-column>
        <el-table-column prop="description" label="Description"></el-table-column>
        <el-table-column prop="requirements" label="Requirements"></el-table-column>
        <el-table-column label="Options">
          <template scope="scope">
            <el-button @click="deleteContentTpl(scope)" style="color: red;" type="text">Delete</el-button>
            <el-button @click="selectActivityFromPool(scope)" type="text">Select</el-button>
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
  const errorCallBack = (result) => {
    console.log('request error:', result && result.message);
    $('#result').val(result.responseText || 'error');
  };
  const progressCallBack = (curr, sha1) => {
    const sha1CheckProgress = `${((sha1 * 100).toFixed(2) || 100)}%`;
    const uploadProgress = `${((curr || 0) * 100).toFixed(2)}%`;
    const msg = `upload progress:${uploadProgress}; sha1 check:${sha1CheckProgress}.`;
    console.log(msg);
    $('#result').val(msg);
  };
  const taskReady = (taskId) => {
    console.log(taskId);
  };
  export default {
    data() {
      return {
        selectDone: false,
        tripId: '',
        scheduleId: '',
        scheduleList: [],
        activityList: [],
        activityDialogVisibile: false,
        activityTabStatus: 'info',
        activityType: '',
        activityTime: '',
        activityPoolFilterKey: '',
        activityPoolDialogVisibile: false,
        activityPool: '',
        sortKey: '',
        classList: ['things_to_do', 'places_to_eat', 'events_for_kids', 'hot_deals'],
        activityTypeList: [{
          value: 'compact',
          label: 'Compact',
        }, {
          value: 'normal',
          label: 'Normal',
        }, {
          value: 'featured',
          label: 'Featured',
        }, {
          value: 'promotion',
          label: 'Promotion',
        }],
        changeTemplateDialogVisibile: false,
        templateList: [],
        activityModal: {},
      };
    },
    computed: {
      activityStartTime: {
        get() {
          if (!this.activityModal.start_time) {
            return '';
          }
          const idxTime = new Date();
          idxTime.setHours(this.activityModal.start_time.split(':')[0]);
          idxTime.setMinutes(this.activityModal.start_time.split(':')[1]);
          idxTime.setSeconds(this.activityModal.start_time.split(':')[2]);
          return idxTime;
        },
        set(val) {
          this.activityModal.start_time = `${val.getHours()}:${val.getMinutes()}:${val.getSeconds()}`;
        },
      },
      activityEndTime: {
        get() {
          if (!this.activityModal.end_time) {
            return '';
          }
          const idxTime = new Date();
          idxTime.setHours(this.activityModal.end_time.split(':')[0]);
          idxTime.setMinutes(this.activityModal.end_time.split(':')[1]);
          idxTime.setSeconds(this.activityModal.end_time.split(':')[2]);
          return idxTime;
        },
        set(val) {
          this.activityModal.end_time = `${val.getHours()}:${val.getMinutes()}:${val.getSeconds()}`;
        },
      },
      filteredData() {
        const activityPoolFilterKey = this.activityPoolFilterKey && this.activityPoolFilterKey.toLowerCase();
        let data = this.activityPool || {};
        if (activityPoolFilterKey) {
          data = data.filter((row) => {
            console.log(row);
            return Object.keys(row).some((key) => {
              console.log(String(row[key]).toLowerCase().indexOf(activityPoolFilterKey));
              return String(row[key]).toLowerCase().indexOf(activityPoolFilterKey) > -1;
            });
          });
        }
        return data;
      },
    },
    event: {
      setShip($event) {
        console.log(`$event father ${$event}`);
      },
    },
    components: {
      'blocker-selector': blockerSelector,
    },
    watch: {
      selectDone(val) {
        if (val) {
          this.getScheduleListByTripId(this.tripId);
          this.getActivityListByScheduleId(this.scheduleId, this.unitId);
          // this.getTemplateList(
          //   this.shipId,
          //   this.$route.fullPath.split('-')[0].split('/')[1],
          //   this.unitId,
          // );
        }
      },
      activityStartTime(val) {
        console.log(val);
      },
    },
    mounted() {
      this.configUpload();
    },
    methods: {
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
              this.activityModal[ori] = res.data.access_url;
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
      setShip(ship) {
        console.log(`shipName father ${ship.shipName}`);
        this.shipId = ship.shipId;
        window.shipNameGlobal = ship.shipName;
        window.scheduleNameGlobal = '';
        window.unitNameGlobal = '';
      },
      setUnit(unit) {
        console.log(unit);
        this.unitId = unit.unitId;
        window.unitNameGlobal = unit.name;
        window.unitIdGlobal = unit.unitId;
        window.scheduleNameGlobal = '';
      },
      setSchedule(schedule) {
        console.log(`scheduleName father ${schedule.scheduleName}`);
        window.scheduleNameGlobal = schedule.scheduleName;
        window.scheduleIdGlobal = schedule.scheduleId;
        this.scheduleId = schedule.scheduleId;
        this.tripId = schedule.tripId;
        this.selectDone = true;
      },
      getScheduleListByTripId(tripId) {
        this.axios.get(`/Schedule/getScheduleListByTripId?trip_id=${tripId}`)
            .then((res) => {
              console.log(res.data);
              this.scheduleList = res.data;
            });
      },
      getActivityListByScheduleId(scheduleId, unitId) {
        this.scheduleId = scheduleId;
        this.axios.get(`/Activity/getActivityScheduleInfo?schedule_id=${scheduleId}&unit_id=${unitId}`)
            .then((res) => {
              this.activityList = res.data;
            });
      },
      getTemplateList(shipId, type, unitId) {
        this.axios.get(`/Template/getTemplateList?ship_id=${shipId}&type=${type}&unit_id=${unitId}`)
            .then((res) => {
              this.templateList = res.data;
            });
      },
      selectTemplate(scope) {
        this.getTemplateDataByTemplateId(scope.row.template_id);
      },
      getTemplateDataByTemplateId(templateId) {
        this.axios.get(`/Template/getTemplateData?template_id=${templateId}`)
            .then((res) => {
              console.log(res.data);
              this.activityList = res.data;
            });
      },
      editActiveHandle(scope) {
        this.activityDialogStatus = 'edit';
        this.activityDialogVisibile = true;
        this.getActivityInfo(scope.row);
      },
      showActivityPool() {
        this.axios.get(`/Template/getContentTplListByUnitId?unit_id=${this.unitId}&type=activity`)
            .then((res) => {
              console.log(res.data);
              this.activityPool = res.data || [];
              this.activityPoolDialogVisibile = true;
            });
      },
      selectActivityFromPool(scope) {
        console.log(scope.row);
        delete scope.row.content_tpl_id;
        this.activityList.push(scope.row);
        this.activityPoolDialogVisibile = false;
      },
      addActivityHandler() {
        this.axios.get('/Activity/generateActivityViewData')
            .then((res) => {
              console.log(res.data);
              this.activityPoolDialogVisibile = false;
              this.activityModal = res.data;
              this.activityDialogVisibile = true;
              this.activityDialogStatus = 'add';
            });
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
            content_list: this.activityList,
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Input Cancel',
          });
        });
      },
      saveContentHandler() {
        this.saveContent({
          schedule_id: this.scheduleId,
          ship_id: this.shipId,
          unit_id: this.unitId,
          type: this.$route.fullPath.split('-')[0].split('/')[1],
          content_list: this.activityList,
        });
      },
      saveContent(postData) {
        this.axios.post('Template/saveContent', postData)
            .then((res) => { console.log(res.data); });
      },
      saveAsNewTemplate(postData) {
        this.axios.post('Template/saveAsNewTemplate', postData)
            .then((res) => { console.log(res.data); });
      },
      getActivityInfo(activityData) {
        this.activityId = activityData.activity_id;
        this.activityModal = JSON.parse(JSON.stringify(activityData));
      },
      saveActivityToList() {
        if (!this.activityModal.title) { this.$message.error('Please Input Activity Title'); return false; }
        if (!this.activityModal.location) { this.$message.error('Please Input Location'); return false; }
        if (!this.activityModal.start_time) { this.$message.error('Please Input Start Time'); return false; }
        if (!this.activityModal.end_time) { this.$message.error('Please Input End Time'); return false; }
        if (this.activityDialogStatus === 'add') {
          this.activityList.push(this.activityModal);
          const postData = {
            unit_id: this.unitId,
            type: 'activity',
            content: JSON.parse(JSON.stringify(this.activityModal)),
          };
          postData.content.start_time = '';
          postData.content.end_time = '';
          this.axios.post('/Template/updateContentTpl', postData)
              .then((res) => {
                console.log(res.data);
              });
        } else {
          this.activityList.map((item, $index) => {
            if (item.activity_id === this.activityModal.activity_id) {
              this.$set(this.activityList, $index, this.activityModal);
              item = this.activityModal;
            }
            return true;
          });
        }
        this.activityDialogVisibile = false;
        return true;
      },
      changeTemplateHandler() {
        this.getTemplateList(
          this.shipId,
          this.$route.fullPath.split('-')[0].split('/')[1],
          this.unitId,
        );
        this.changeTemplateDialogVisibile = true;
      },
      deleteContentTpl(scope) {
        console.log(scope.row);
        this.$confirm('This operation will not be able to recover, Go on?', 'Tips', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'error',
        }).then(() => {
          this.axios.get(`/Content_tpl/deleteDataById?content_tpl_id=${scope.row.content_tpl_id}`)
            .then(() => {
              this.$message.success('Delete Success');
              this.filteredData.splice(scope.$index, 1);
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Canceled',
          });
        });
      },
      deleteActiveHandle(scope) {
        this.$confirm('此操作将无法恢复, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error',
        }).then(() => {
          this.activityList.splice(scope.$index, 1);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          });
        });
      },
    },
  };
</script>