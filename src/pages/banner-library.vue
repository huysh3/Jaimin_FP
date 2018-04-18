<template>
  <div class="banner-library--container">
    <header class="library--filter--content">
      <el-input
        v-model="inputFilterKey"
        class="filter-input"
        placeholder="Input Keywords To Search.."
        size="small"/>
      <el-button
        @click="addBannerHandler"
        class="costa-btn_blue"
        size="small">
        Add +
      </el-button>
    </header>
    <div class="library--body-content">
      <el-table :data="filteredData">
        <el-table-column sortable prop="business_unit" label="Business Unit"></el-table-column>
        <el-table-column sortable prop="title" label="Title"></el-table-column>
        <el-table-column sortable prop="location" label="Location"></el-table-column>
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
            @click="select()"
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
  </div>
</template>

<script>
const bannerDialog = {
  title: '',
  location: '',
  start_time: '',
  end_time: '',
  activity_id: '',
};

export default {
  data() {
    return {
      bannerDialog,
      tabPosition: 'info',
      bannerDialogVisibile: false,
      inputFilterKey: '',
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
    };
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
    addBannerHandler() {
      this.bannerDialogStatus = 'add';
      this.bannerDialogVisibile = true;
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
