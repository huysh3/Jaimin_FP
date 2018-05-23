<template>
  <div class="truck-list--container">
     <quill-editor
      v-model="companyInfo"
      ref="myQuillEditor"
      :options="editorOption"
    />
    <el-button
      class="save--btn"
      size="small"
      @click="saveCompanyInfo"
      type="primary"
    >Save</el-button>
    <el-card
      style="text-indent: 40px; padding: 40px;"
      class="card--content"
      shadow="always"
      v-html="companyInfo"
    >
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      companyInfo: '',
      editorOption: {},
    };
  },
  mounted() {
    this.getCompanyInfo();
    setInterval(() => {
      this.companyInfo = JSON.parse(JSON.stringify(this.companyInfo));
    }, 1000);
  },
  methods: {
    getCompanyInfo() {
      this.axios.get('/get/company_info')
        .then((res) => {
          console.log(res[0].content);
          this.companyInfo = res[0].content;
        });
    },
    saveCompanyInfo() {
      this.axios.get(`/post/update_company_info?content=${this.companyInfo}`)
        .then((res) => {
          console.log(res);
        });
    },
  },
};
</script>

<style lang="less" scoped>
  .save--btn {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .card--content {
    background-color: #4e4e4e;
    color: #edeace;
  }
</style>
