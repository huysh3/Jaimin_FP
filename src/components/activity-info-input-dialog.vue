<template>
  <el-dialog
    title="Activity Info Input"
    :visible.sync="$store.state.activityManagement.activityInfoInputDialogVisible"
    width="50%">
    <div class="body">
      <el-tabs type="border-card">
        <el-tab-pane label="Info">
          <el-row>
            <el-col class="form-input--container" :span="10">
              <div class="title">Business Unit</div>
              <el-select v-model="selectorValue" placeholder="Please Select" size="small">
                <el-option
                  v-for="item in businessUnitList"
                  :key="item.unit_id"
                  :label="item.name"
                  :value="item.unit_id">
                </el-option>
              </el-select>
            </el-col>
            <el-col class="form-input--container">
              <div class="title">Title</div>
              <el-input size="small"></el-input>
            </el-col>
            <el-col class="form-input--container" :span="8">
              <div class="title">Cost(USD)</div>
              <el-input size="small"></el-input>
            </el-col>
            <el-col class="form-input--container" :span="12" :offset="4">
              <div class="title">Time</div>
              <el-row>
                <el-col :span="10"><el-input size="small"></el-input></el-col>
                <el-col :span="2" :offset="1">to</el-col>
                <el-col :span="10"><el-input size="small"></el-input></el-col>
              </el-row>
            </el-col>
            <el-col class="form-input--container" :span="10">
              <div class="title">Description</div>
              <el-input size="small" type="textarea"></el-input>
            </el-col>
            <el-col class="form-input--container" :span="10" :offset="2">
              <div class="title">Requirements</div>
              <el-input size="small" type="textarea"></el-input>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="Info(Cn)">
          <div class="form-input--container">
            <div class="title">Title(CHN)</div>
            <el-input size="small"></el-input>
          </div>
          <div class="form-input--container">
            <div class="title">Location(CHN)</div>
            <el-input size="small"></el-input>
          </div>
          <div class="form-input--container">
            <div class="title">Description(CHN)</div>
            <el-input size="small" type="textarea"></el-input>
          </div>
          <div class="form-input--container">
            <div class="title">Requirements(CHN)</div>
            <el-input size="small" type="textarea"></el-input>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Info(Jp)">
          <div class="form-input--container">
            <div class="title">Title(JPN)</div>
            <el-input size="small"></el-input>
          </div>
          <div class="form-input--container">
            <div class="title">Location(JPN)</div>
            <el-input size="small"></el-input>
          </div>
          <div class="form-input--container">
            <div class="title">Description(JPN)</div>
            <el-input size="small" type="textarea"></el-input>
          </div>
          <div class="form-input--container">
            <div class="title">Requirements(JPN)</div>
            <el-input size="small" type="textarea"></el-input>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Wechat">
          <el-checkbox-group class="display-part--content" v-model="displayCheckList">
            <el-checkbox label="Things to do"></el-checkbox>
            <el-checkbox label="Places to eat"></el-checkbox>
            <el-checkbox label="Events for Kids"></el-checkbox>
            <el-checkbox label="Hot deals"></el-checkbox>
          </el-checkbox-group>
          <div class="form-input--container select-feedback--content">
            <div class="title">Card Type</div>
            <el-select v-model="selectorValue" placeholder="Please Select" size="small">
              <el-option
                v-for="item in cardTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <el-row>
            <el-col :span="12">
              <div class="img-uploader--content">
                <div class="title">Card Image</div>
                <div class="uploader-img--container">
                  <img class="uploader-img" src="http://images-1254092492.cosgz.myqcloud.com/2018-03-20-%E5%8A%A0%E5%87%8F%E7%BB%84%E4%BB%B6%20%E5%8A%A0%E5%8F%B7.png" alt="">
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="img-uploader--content">
                <div class="title">Page Image</div>
                <div class="uploader-img--container">
                  <img class="uploader-img" src="http://images-1254092492.cosgz.myqcloud.com/2018-03-20-%E5%8A%A0%E5%87%8F%E7%BB%84%E4%BB%B6%20%E5%8A%A0%E5%8F%B7.png" alt="">
                </div>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
        <!-- <el-tab-pane label="DT Print">DTP</el-tab-pane> -->
     </el-tabs>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="small"  @click="dialogVisible = false">Cancel</el-button >
      <el-button size="small" type="primary" @click="dialogVisible = false">Confirm</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  // props: {
  //   dialogVisible: {
  //     type: Boolean,
  //     required: true,
  //   },
  // },
  data() {
    return {
      selectorValue: '',
      displayCheckList: ['Things to do'],
      businessUnitList: [],
      cardTypeList: [{
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
      selectorData: [{
        value: 'compact',
        label: 'compact',
      }, {
        value: 'middle',
        label: 'middle',
      }, {
        value: 'large',
        label: 'large',
      }, {
        value: 'promotion',
        label: 'promotion',
      }],
    };
  },
  mounted() {

  },
  methods: {
    getBusinessUnitList(shipId) {
      this.axios.get(`/Unit/getUnitListByShipId?ship_id=${shipId}`)
        .then((res) => {
          console.log(res);
          this.businessUnitList = res.data;
        });
    },
  },
};
</script>

<style scoped lang="less">
  .form-input--container {
    padding-bottom: 1rem;
  }

  .display-part--content {
    padding-bottom: .4rem;
    border-bottom: 1px solid #b5b3b3;
  }

  .select-feedback--content {
    margin-top: .4rem;
    padding-bottom: .8rem;
    border-bottom: 1px solid #b5b3b3;
  }

  .img-uploader--content {
    padding-top: 1rem;
    .title {
      padding-bottom: .4rem;
    }
    .uploader-img--container {
      width: 12rem;
      height: 6rem;
      border: 1px solid #b5b3b3;
      border-radius: .2rem;
      display: flex;
      align-items:center;
      justify-content: center;
      cursor: pointer;
      .uploader-img {
        width: 2rem;
        height: 2rem;
      }
    }
  }
</style>
