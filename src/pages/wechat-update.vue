<template>
  <div class="wechat-update--container">
    <div class="top--part">
      <el-row>
        <el-col
          :span="12"
          class="form-cell--container">
          <div class="title">Trip Code</div>
          <el-select
            value-key="trip_id"
            v-model="currentTrip"
            placeholder="Please Select"
            size="small">
            <el-option
              v-for="item in $store.state.contentManagement.tripList"
              :key="item.code"
              :label="item.code"
              :value="item" />
          </el-select>
        </el-col>
        <el-col
          :span="6"
          class="form-cell--container">
          <div class="title">Departure Port</div>
          <el-input size="small" disabled v-model="portName"></el-input>
        </el-col>
      </el-row>
    </div>
    <div class="step step1">
      <div class="title">Step1: Update Content to Stage</div>
      <el-button class="costa-btn_primary" size="small">Update to Stage</el-button>
    </div>
    <div class="step step2">
      <div class="title">Step2: Stage Approve</div>
      <el-table
        :data="approveData">
        <el-table-column prop="version" label="Version"></el-table-column>
        <el-table-column prop="status" label="Status"></el-table-column>
        <el-table-column label="Operation">
          <template scope="scope">
            <el-button type="text">Withdraw</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="step step3">
      <div class="step-top--content">
        <div class="title">Step3: Update to Pord</div>
        <el-button size="small" class="costa-btn_primary">Update To Prod</el-button>
      </div>
      <el-table
        :data="prodData">
        <el-table-column prop="version" label="Version"></el-table-column>
        <el-table-column prop="publishDate" label="Publish Date"></el-table-column>
        <el-table-column label="Preview">
          <template scope="scope">
            <el-button type="text">Preview QR</el-button>
          </template>
        </el-table-column>
        <el-table-column label="Operation">
          <template scope="scope">
            <el-button type="text">Withdraw</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentTrip: '',
      portName: 'ShangHai',
      approveData: [{
        version: '1111',
        status: 'online',
      }],
      prodData: [{
        version: '1111',
        publishDate: '2018-10-22',
      }],
    };
  },
};
</script>

<style lang="less" scoped>
  .top--part {
    border-bottom: 1px solid #f0f0f0;
    .form-cell--container {
      .title {
        font-size: .8rem;
        margin-bottom: .7rem;
      }
    }
  }
  .step {
    padding: .7rem 0;
    padding-top: 2rem;
    border-bottom: 1px solid #ccc;
    .title {
      color: #959391;
      font-size: .8rem;
      font-weight: bold;
    }
    .costa-btn_primary {
      margin-left: 2rem;
      position: relative;
      bottom: .2rem;
    }
    .step-top--content {
      display: flex;
    }
    &.step1 {
      display: flex;
    }
  }
</style>
