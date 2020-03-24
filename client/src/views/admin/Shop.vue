<template>
    <div id="shop-info">
        <el-row type="flex" class="row-height" justify="center" align="middle">
            <el-col :xs="24" :sm="18" :md="12" :lg="10" :xl="6">
               <el-form
                ref="form"
                :model="form"
                label-width="80px"
                :rules="rules"
                :hide-required-asterisk="true"
                >
                <el-form-item label="店铺图片">
                    <el-upload
                    class="logo-uploader"
                    :action="uploadUrl"
                    :show-file-list="false"
                    :on-success="handleImgSuccess"
                    :before-upload="beforeImgUpload">
                    <img v-if="form.shopImg" :src="form.shopImg" class="logo">
                    <i v-else class="el-icon-plus logo-uploader-icon"></i>
                    <div slot="tip" class="el-upload__tip">(只能上传jpg文件，且不超过2MB)</div>
                    </el-upload>
                </el-form-item>

                <el-form-item label="店铺名称" prop="shopName">
                    <el-input v-model="form.shopName" placeholder="请输入店铺名称！"></el-input>
                </el-form-item>
                <el-form-item label="店铺简介" prop="shopIntro">
                    <el-input type="textarea" v-model="form.shopIntro" :autosize="{ minRows: 4, maxRows: 4}" show-word-limit placeholder="请输入店铺简介！"></el-input>
                </el-form-item>
                <el-form-item label="店铺公告" prop="shopNotice">
                    <el-input type="textarea" v-model="form.shopNotice" :autosize="{ minRows: 4, maxRows: 4}" show-word-limit placeholder="请输入店铺公告！"></el-input>
                </el-form-item>
                    <el-button
                    type="primary"
                    class="submitBtn"
                    @click="submitForm('form')"
                    >更新信息</el-button>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
  name: 'shop',
  data () {
    return {
      uploadUrl: '/api/shop/upload',
      form: {
        id: '',
        shopImg: '',
        shopName: '',
        shopIntro: '',
        shopNotice: ''
      },
      rules: {
        shopName: [
          { required: true, message: '店铺名称不能为空！', trigger: 'blur' },
          { min: 2, max: 18, message: '长度在2到18个字符之间！', trigger: 'blur' }
        ],
        shopIntro: [
          { required: true, message: '店铺简介不能为空！', trigger: 'blur' },
          { min: 10, message: '店铺简介最少为10个字符！', trigger: 'blur' }
        ],
        shopNotice: [
          { required: true, message: '店铺公告不能为空！', trigger: 'blur' },
          { min: 10, message: '店铺公告最少为10个字符！', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      if (!this.form.shopImg) {
        this.$message({ type: 'error', message: '店铺图片上传失败请重试' })
        return
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios.post('/api/shop/edit', this.form)
            .then(res => {
              this.$message({
                message: res.data,
                type: 'success'
              })
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          this.$message({
            type: 'error',
            message: '填写信息有误请重新输入！'
          })
          return false
        }
      })
    },
    handleImgSuccess (res, file) {
      if (res.status === 'ok') {
        this.form.shopImg = res.url
      }
    },
    beforeImgUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  },
  mounted () {
    this.$axios.get('/api/shop/get')
      .then(res => {
        this.form.id = res.data._id
        this.form.shopImg = res.data.shopImg
        this.form.shopName = res.data.shopName
        this.form.shopIntro = res.data.shopIntro
        this.form.shopNotice = res.data.shopNotice
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style scoped>
  #shop-info{
      height: 100%;
  }
  .logo-uploader .el-upload {
  cursor: pointer;
  position: relative;
  overflow: hidden;
    }
    .logo-uploader .el-upload:hover {
    border-color: #409EFF;
    }
    .logo-uploader-icon {
    margin-top: 1px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    }
    .logo-uploader-icon:hover{
    border-color: #409EFF;
    }
    .logo {
    width: 100px;
    height: 100px;
    display: block;
    }
    .submitBtn{
        width: 200px;
        display: block;
        margin: 0 auto;
        box-shadow: 0px 0px 20px rgba(53, 141, 230, 0.562);
    }
    .row-height{
        height: 100%;
    }
</style>
