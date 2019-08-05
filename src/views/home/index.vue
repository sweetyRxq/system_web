<template>
  <div class="app-container">
    <el-row :gutter="0">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="colCard">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <i class="el-icon-phone"></i>
            <span>请选择要上传的文件</span>
          </div>
          <div  class="text item">环境不满意，环保投诉应用帮助您！写上您的投诉信息附带着照片信息向我们发送吧！</div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        status: null,
        loading: false,
        btnName: '部署',
      }
    },
    created() {
      this.init()
    },
    methods: {
      init() {

      },
      deployApp() {
        this.loading = true
        this.btnName = '部署中'
      },
      openApp() {
        
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      }
    }
  }
</script>

<style lang="scss" scoped>
.app-container{
  .text {
    font-size: 14px;
  }
  .item {
    margin-bottom: 18px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both;
    overflow: hidden;
  }
  .box-card {
  }
  .colCard{
    padding: 20px;
  }
  .right-text-logo{
    float: right;
    padding: 0 3px;
  }
}
</style>
