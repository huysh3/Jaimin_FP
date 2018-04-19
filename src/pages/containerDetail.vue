<template>
  <div class="container-detail">
    <div class="header title"><el-tag type="success">Name: {{containerDetail.Name}}</el-tag></div>
    <div class="options--cotnainer">
      <el-button size="small" type="warning">Pause</el-button>
      <el-button size="small" type="danger">Stop</el-button>
      <el-button size="small" type="success">Restart</el-button>
      <el-button size="small" type="danger">Destory</el-button>
      <el-button size="small" type="primary">Stats</el-button>
      <el-button size="small" type="primary">Logs</el-button>
      <el-button size="small" type="primary">Console</el-button>
    </div>
    <div class="info--part">
      <el-row>
        <el-col :span="11">
          <el-card class="box-card">
            <p class="info--title">Container Configuration</p>
            <el-collapse v-model="activeName" accordion>
              <el-collapse-item title="Container ID" name="1">
                {{containerDetail.Id}}
              </el-collapse-item>
              <el-collapse-item title="Command" name="2">
                {{containerDetail.Config.Cmd}}
              </el-collapse-item>
              <el-collapse-item title="Host Name" name="3">
                {{containerDetail.Config.Hostname}}
              </el-collapse-item>
              <el-collapse-item title="Domain Name" name="4">
                {{containerDetail.Config.Domainname || 'N/A'}}
              </el-collapse-item>
            </el-collapse>
          </el-card>
        </el-col>
        <el-col :span="12" :offset="1">
          <el-card class="box-card">
            <p class="info--title">Swarm Node</p>
            <el-collapse v-model="activeName2" accordion>
              <el-collapse-item title="CPUs" name="3">
                {{containerDetail.HostConfig.CpuCount}}
              </el-collapse-item>
              <el-collapse-item title="Memory" name="4">
                {{containerDetail.HostConfig.Memory}}
              </el-collapse-item>
            </el-collapse>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      containerDetail: {},
      activeName: 1,
      activeName2: 1,
    };
  },
  mounted() {
    this.getDetailById(this.$route.params.container_id);
  },
  methods: {
    getDetailById(containerId) {
      this.axios.get(`/containers/${containerId}`)
        .then((res) => {
          console.log(res);
          this.containerDetail = res;
        });
    },
  },
};
</script>

<style lang="less" scoped>
.header.title {
  font-weight: bold;
  padding-bottom: 20px;
}
.info--part {
  margin-top: 40px;
  .info--title {
    margin-top: 0;
  }
}
</style>
