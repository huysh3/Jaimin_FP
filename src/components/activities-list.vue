<template>
  <div class="activities-list--container">
    <form id="form">
      <input id="js-file" type="file" style="display:none;"/>
    </form>
    <div class="announcement-list--container">
      <section class="day-list--container">
        <div
          class="day--container"
          :class="item.schedule_id == scheduleId ? 'active' : ''"
          v-for="(item, index) in scheduleList"
          :key="index"
          @click="getActivityListByScheduleId(item.schedule_id, $route.params.unit_id)">
          <div class="day--title">{{item.name}}</div>
          <div class="day--index">Day {{index + 1}}</div>
          <img class="activity--tag" src="http://images-1254092492.cosgz.myqcloud.com/2017-11-07-084021.png" alt="">
        </div>
      </section>
      <el-table :data="activityList" empty-text="No data">
        <el-table-column sortable prop="title" label="Title"></el-table-column>
        <el-table-column sortable prop="activity_id" label="ID" width="150"></el-table-column>
        <el-table-column sortable prop="start_time" label="Start time">
          <template scope="scope">
            <span style="font-weight: bold; color: red;" v-if="!scope.row.start_time">Please Define</span>
            <span v-if="scope.row.start_time">{{`${scope.row.start_time.split(':')[0]}:${scope.row.start_time.split(':')[1]}`}}</span>
          </template>
        </el-table-column>
        <el-table-column sortable prop="end_time" label="End time">
          <template scope="scope">
            <span style="font-weight: bold; color: red;" v-if="!scope.row.end_time">Please Define</span>
            <span v-if="scope.row.end_time">{{`${scope.row.end_time.split(':')[0]}:${scope.row.end_time.split(':')[1]}`}}</span>
            <!-- {{`${scope.row.end_time.split(':')[0]}:${scope.row.end_time.split(':')[1]}`}} -->
          </template>
        </el-table-column>
        <el-table-column sortable prop="type" label="Card Style"></el-table-column>
        <el-table-column label="Operation">
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
        <el-button @click="$router.go(-1)" size="small">Cancel</el-button>
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
          <el-autocomplete
            @click="select()"
            placeholder="start time"
            v-model="activityModal.start_time"
            :fetch-suggestions="queryString"
          ></el-autocomplete>
          <el-autocomplete
            placeholder="end time"
            :min="activityModal.start_time"
            v-model="activityModal.end_time"
            :fetch-suggestions="queryString"
          ></el-autocomplete>
        </div>
        <el-checkbox
          v-model="activityModal[cls]"
          v-for="(cls, $index) in classList"
          :label="cls"
          :key="$index"
          true-label="1"
          false-label="0">
            {{cls}}
        </el-checkbox>
      </div>
      <div v-if="activityTabStatus == 'wechatView'">
        <section class="image-manage--container">
          <el-row :gutter="100">
            <el-col :span="6">
              <p>Card Image</p>
              <div>
                <el-upload
                  action="https://costa.wechatify.com/assets/upload"
                  class="avatar-uploader"
                  name="card_image"
                  :show-file-list="false"
                  objectBind="card_image"
                  :http-request="handleUploadRequest"
                  :before-upload="beforeImgUpload">
                  <img @click="uploadOrigin='card_image'" v-if="activityModal.card_image" :src="`${activityModal.card_image}`" class="avatar">
                  <i @click="uploadOrigin='card_image'" v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
            </el-col>
            <el-col :span="6">
              <p>Page Image</p>
              <el-upload
                action="https://costa.wechatify.com/assets/upload"
                class="avatar-uploader"
                name="page_image"
                :show-file-list="false"
                objectBind="page_image"
                :http-request="handleUploadRequest"
                :before-upload="beforeImgUpload">
                <img @click="uploadOrigin='page_image'" v-if="activityModal.page_image" :src="`${activityModal.page_image}`" class="avatar">
                <i @click="uploadOrigin='page_image'" v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
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
      <el-table :data="templateList" stripe style="width: 100%" empty-text="No data">
        <el-table-column sortable prop="key_words" label="key_words"></el-table-column>
        <el-table-column sortable prop="ship_id" label="ship_id"></el-table-column>
        <!-- <el-table-column sortable prop="template_id" label="template_id"></el-table-column> -->
        <el-table-column sortable prop="type" label="type"></el-table-column>
        <el-table-column sortable prop="unit_id" label="unit_id"></el-table-column>
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
      <el-table :data="filteredData" style="width: 100%" empty-text="No data">
        <el-table-column sortable prop="title" label="Title"></el-table-column>
        <el-table-column sortable prop="type" label="Type"></el-table-column>
        <!-- <el-table-column sortable prop="description" label="Description"></el-table-column> -->
        <!-- <el-table-column sortable prop="requirements" label="Requirements"></el-table-column> -->
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
  export default {
    data() {
      return {
        selectDone: false,
        tripId: '',
        loading_card_image: false,
        loading_page_image: false,
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
        uploadOrigin: '',
        timeList: [{ value: '0:00' }, { value: '0:05' }, { value: '0:10' }, { value: '0:15' }, { value: '0:20' }, { value: '0:25' }, { value: '0:30' }, { value: '0:35' }, { value: '0:40' }, { value: '0:45' }, { value: '0:50' }, { value: '0:55' }, { value: '1:00' }, { value: '1:05' }, { value: '1:10' }, { value: '1:15' }, { value: '1:20' }, { value: '1:25' }, { value: '1:30' }, { value: '1:35' }, { value: '1:40' }, { value: '1:45' }, { value: '1:50' }, { value: '1:55' }, { value: '2:00' }, { value: '2:05' }, { value: '2:10' }, { value: '2:15' }, { value: '2:20' }, { value: '2:25' }, { value: '2:30' }, { value: '2:35' }, { value: '2:40' }, { value: '2:45' }, { value: '2:50' }, { value: '2:55' }, { value: '3:00' }, { value: '3:05' }, { value: '3:10' }, { value: '3:15' }, { value: '3:20' }, { value: '3:25' }, { value: '3:30' }, { value: '3:35' }, { value: '3:40' }, { value: '3:45' }, { value: '3:50' }, { value: '3:55' }, { value: '4:00' }, { value: '4:05' }, { value: '4:10' }, { value: '4:15' }, { value: '4:20' }, { value: '4:25' }, { value: '4:30' }, { value: '4:35' }, { value: '4:40' }, { value: '4:45' }, { value: '4:50' }, { value: '4:55' }, { value: '5:00' }, { value: '5:05' }, { value: '5:10' }, { value: '5:15' }, { value: '5:20' }, { value: '5:25' }, { value: '5:30' }, { value: '5:35' }, { value: '5:40' }, { value: '5:45' }, { value: '5:50' }, { value: '5:55' }, { value: '6:00' }, { value: '6:05' }, { value: '6:10' }, { value: '6:15' }, { value: '6:20' }, { value: '6:25' }, { value: '6:30' }, { value: '6:35' }, { value: '6:40' }, { value: '6:45' }, { value: '6:50' }, { value: '6:55' }, { value: '7:00' }, { value: '7:05' }, { value: '7:10' }, { value: '7:15' }, { value: '7:20' }, { value: '7:25' }, { value: '7:30' }, { value: '7:35' }, { value: '7:40' }, { value: '7:45' }, { value: '7:50' }, { value: '7:55' }, { value: '8:00' }, { value: '8:05' }, { value: '8:10' }, { value: '8:15' }, { value: '8:20' }, { value: '8:25' }, { value: '8:30' }, { value: '8:35' }, { value: '8:40' }, { value: '8:45' }, { value: '8:50' }, { value: '8:55' }, { value: '9:00' }, { value: '9:05' }, { value: '9:10' }, { value: '9:15' }, { value: '9:20' }, { value: '9:25' }, { value: '9:30' }, { value: '9:35' }, { value: '9:40' }, { value: '9:45' }, { value: '9:50' }, { value: '9:55' }, { value: '10:00' }, { value: '10:05' }, { value: '10:10' }, { value: '10:15' }, { value: '10:20' }, { value: '10:25' }, { value: '10:30' }, { value: '10:35' }, { value: '10:40' }, { value: '10:45' }, { value: '10:50' }, { value: '10:55' }, { value: '11:00' }, { value: '11:05' }, { value: '11:10' }, { value: '11:15' }, { value: '11:20' }, { value: '11:25' }, { value: '11:30' }, { value: '11:35' }, { value: '11:40' }, { value: '11:45' }, { value: '11:50' }, { value: '11:55' }, { value: '12:00' }, { value: '12:05' }, { value: '12:10' }, { value: '12:15' }, { value: '12:20' }, { value: '12:25' }, { value: '12:30' }, { value: '12:35' }, { value: '12:40' }, { value: '12:45' }, { value: '12:50' }, { value: '12:55' }, { value: '13:00' }, { value: '13:05' }, { value: '13:10' }, { value: '13:15' }, { value: '13:20' }, { value: '13:25' }, { value: '13:30' }, { value: '13:35' }, { value: '13:40' }, { value: '13:45' }, { value: '13:50' }, { value: '13:55' }, { value: '14:00' }, { value: '14:05' }, { value: '14:10' }, { value: '14:15' }, { value: '14:20' }, { value: '14:25' }, { value: '14:30' }, { value: '14:35' }, { value: '14:40' }, { value: '14:45' }, { value: '14:50' }, { value: '14:55' }, { value: '15:00' }, { value: '15:05' }, { value: '15:10' }, { value: '15:15' }, { value: '15:20' }, { value: '15:25' }, { value: '15:30' }, { value: '15:35' }, { value: '15:40' }, { value: '15:45' }, { value: '15:50' }, { value: '15:55' }, { value: '16:00' }, { value: '16:05' }, { value: '16:10' }, { value: '16:15' }, { value: '16:20' }, { value: '16:25' }, { value: '16:30' }, { value: '16:35' }, { value: '16:40' }, { value: '16:45' }, { value: '16:50' }, { value: '16:55' }, { value: '17:00' }, { value: '17:05' }, { value: '17:10' }, { value: '17:15' }, { value: '17:20' }, { value: '17:25' }, { value: '17:30' }, { value: '17:35' }, { value: '17:40' }, { value: '17:45' }, { value: '17:50' }, { value: '17:55' }, { value: '18:00' }, { value: '18:05' }, { value: '18:10' }, { value: '18:15' }, { value: '18:20' }, { value: '18:25' }, { value: '18:30' }, { value: '18:35' }, { value: '18:40' }, { value: '18:45' }, { value: '18:50' }, { value: '18:55' }, { value: '19:00' }, { value: '19:05' }, { value: '19:10' }, { value: '19:15' }, { value: '19:20' }, { value: '19:25' }, { value: '19:30' }, { value: '19:35' }, { value: '19:40' }, { value: '19:45' }, { value: '19:50' }, { value: '19:55' }, { value: '20:00' }, { value: '20:05' }, { value: '20:10' }, { value: '20:15' }, { value: '20:20' }, { value: '20:25' }, { value: '20:30' }, { value: '20:35' }, { value: '20:40' }, { value: '20:45' }, { value: '20:50' }, { value: '20:55' }, { value: '21:00' }, { value: '21:05' }, { value: '21:10' }, { value: '21:15' }, { value: '21:20' }, { value: '21:25' }, { value: '21:30' }, { value: '21:35' }, { value: '21:40' }, { value: '21:45' }, { value: '21:50' }, { value: '21:55' }, { value: '22:00' }, { value: '22:05' }, { value: '22:10' }, { value: '22:15' }, { value: '22:20' }, { value: '22:25' }, { value: '22:30' }, { value: '22:35' }, { value: '22:40' }, { value: '22:45' }, { value: '22:50' }, { value: '22:55' }, { value: '23:00' }, { value: '23:05' }, { value: '23:10' }, { value: '23:15' }, { value: '23:20' }, { value: '23:25' }, { value: '23:30' }, { value: '23:35' }, { value: '23:40' }, { value: '23:45' }, { value: '23:50' }, { value: '23:55' }],
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
    mounted() {
      [
        this.shipId,
        this.unitId,
        this.tripId,
        this.scheduleId,
      ] = [
        this.$route.params.ship_id,
        this.$route.params.unit_id,
        this.$route.params.trip_id,
        this.$route.params.schedule_id,
      ];
      this.getScheduleListByTripId(this.tripId);
      this.getActivityListByScheduleId(
        this.scheduleId,
        this.unitId,
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
        this.editIndex = scope.row.time;
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
        scope.row.time = (new Date()).getTime();
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
        console.log(this.activityModal);
        if (!this.activityModal.type) { this.$message.error('Please Select Activity Card Type'); return false; }
        if (!this.activityModal.title) { this.$message.error('Please Input Activity Title'); return false; }
        if (!this.activityModal.location) { this.$message.error('Please Input Location'); return false; }
        if (!this.activityModal.start_time) { this.$message.error('Please Input Start Time'); return false; }
        if (!this.activityModal.end_time) { this.$message.error('Please Input End Time'); return false; }
        if (this.activityModal.end_time < this.activityModal.start_time) { this.$message.error('End time must be later than Start time'); return false; }
        if (this.activityDialogStatus === 'add') {
          this.activityModal.time = (new Date()).getTime();
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
            console.log(this.editIndex);
            if (item.time === this.editIndex) {
              // item = this.activityModal;
              this.$set(this.activityList, $index, this.activityModal);
            }
            return true;
          });
          // this.$set(this.activityList, this.editIndex, this.activityModal);
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
        this.$confirm('Please confirm you would like to delete this?', 'Notice', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'error',
        }).then(() => {
          // this.activityList.splice(scope.$index, 1);
          this.activityList.map((item, $index) => {
            if (item.time === scope.row.time) {
              this.activityList.splice($index, 1);
            }
            return true;
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
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
            this.activityModal[`${this.uploadOrigin}`] = res.Name;
            console.log(this.activityModal);
          });
      },
    },
  };
</script>
