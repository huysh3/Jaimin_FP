<template>
  <div class="banner-edit--container">
    <div class="container--title">Add Banner</div>
    <el-radio-group size="small" v-model="tabPosition" style="margin-bottom: 30px;">
      <el-radio-button label="info">Info</el-radio-button>
      <el-radio-button label="wechat">WechatView</el-radio-button>
    </el-radio-group>
    <div class="block" v-if="tabPosition == 'info'">
      <div class="form-cell--container">
        <p class="form--title">Banner Title</p>
        <el-input size="small"></el-input>
      </div>
      <div class="form-cell--container">
        <p class="form--title">Location</p>
        <el-input size="small" placeholder="Deck"></el-input>
      </div>
      <div class="form-cell--container">
        <p class="form--title">Times</p>
        <el-date-picker
          v-model="timeRange"
          type="datetimerange"
          range-separator="至"
          format="MM-dd/HH:mm:ss"
          start-placeholder="Start Time"
          end-placeholder="End Time">
        </el-date-picker>
      </div>
      <div class="form-cell--container">
        <p class="form--title">Link Activity</p>
        <!-- <el-input size="small" placeholder="Activity ID"></el-input> -->
        <el-button class="costa-btn_blue">Select Activity</el-button>
      </div>
      <div class="options--container">
        <el-button size="small" class="costa-btn_primary">Save Activity</el-button>
        <el-button size="small">Cancel</el-button>
      </div>
    </div>
    <div class="block" v-if="tabPosition == 'wechat'">
      <section class="image-manage--container">
        <el-row>
          <el-col :span="6" class="upload-img--container">
            <div class="upload-img--title">Banner Image</div>
            <img :src="'' || 'https://ws1.sinaimg.cn/large/006tKfTcgy1fke3ewimi2j30b30b474h.jpg'" class="uplaod--btn"></img>
          </el-col>
        </el-row>
      </section>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tabPosition: 'wechat',
        timeRange: '',
      };
    },
  };
</script>
