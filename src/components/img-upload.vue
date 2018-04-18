<template>
  <div class="img-upload--container">
    <h1>IMG UPLOAD</h1>
    <div class="file--content">
      <img v-for="(item, index) in fileList" :key="`${index}idx`" :src="item.Name" alt="">
    </div>
    <el-upload
      class="upload-demo"
      action="https://costa.wechatify.com/assets/upload"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="getFileList"
      :file-list="fileList2"
      name="filename"
      list-type="picture">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList2: [],
      fileList: [],
    };
  },
  mounted() {
    this.getFileList();
  },
  methods: {
    getFileList() {
      this.axios.get('https://costa.wechatify.com/assets/files')
          .then((res) => {
            this.fileList = res.Files;
          });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
  },
};
</script>

<style scoped>
  .file--content img {
    background-color: #000;
    width: 4rem;
    height: 4rem;
    object-fit: contain;
    margin: 1rem;
  }
</style>
