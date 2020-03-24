<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-form
          ref="form"
          :model="form"
          label-width="80px"
          :rules="rules"
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
            <el-input type="textarea" v-model="form.shopIntro" placeholder="请输入店铺简介！"></el-input>
          </el-form-item>
          <el-form-item label="店铺公告" prop="shopNotice">
            <el-input type="textarea" v-model="form.shopNotice" placeholder="请输入店铺公告！"></el-input>
          </el-form-item>
            <el-button
              type="primary"
              class="submitBtn"
              @click="submitForm('form')"
            >下一步</el-button>
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
          this.$axios.post('/api/shop/create', this.form)
            .then(res => {
              this.$message({
                message: '店铺信息初始化成功',
                type: 'success'
              })
              this.$axios.post('/api/init/setStat', { shop: true })
              this.$emit('changeStatus', 2)
              this.$router.push('/init/complete')
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
  created () {
    this.$emit('changeStatus', 1)
    this.$axios.get('/api/init/getStat')
      .then(result => {
        const status = result.data
        if (!status.admin) {
          this.$emit('changeStatus', 0)
          this.$router.push('/init/admin')
        } else if (status.shop) {
          this.$emit('changeStatus', 3)
          this.$router.push('/init/complete')
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style scoped>
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
}
</style>
