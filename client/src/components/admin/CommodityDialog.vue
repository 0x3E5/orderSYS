<template>
    <div id="category-dialog">
        <el-dialog :title="dialog.title" :visible.sync="dialog.show" width="30%">
        <el-form ref="form" :model="form" :rules="form_rules">
            <el-form-item label="商品图片" :label-width="formLabelWidth">
                <el-upload
                class="commodity-uploader"
                action=""
                :show-file-list="false"
                :http-request="uploadSectionFile"
                :before-upload="beforeImgUpload">
                    <img v-if="form.img" :src="form.img" class="commodity">
                    <i v-else class="el-icon-plus commodity-uploader-icon"></i>
                    <div slot="tip" class="el-upload__tip">(只能上传jpg文件，且不超过2MB)</div>
                </el-upload>
            </el-form-item>
            <el-form-item label="商品名称" prop="name" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off" placeholder="请输入商品名称"></el-input>
            </el-form-item>
            <el-form-item label="商品描述" prop="describe" :label-width="formLabelWidth">
                <el-input type="textarea" maxlength="200" :autosize="{ minRows: 4, maxRows: 4 }" show-word-limit v-model.number="form.describe" autocomplete="off" placeholder="请输入商品描述"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="category" :label-width="formLabelWidth">
                <el-select v-model="form.category" placeholder="请选择">
                    <el-option
                    v-for="item in categoryList"
                    :key="item.cName"
                    :label="item.cName"
                    :value="item.cName">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="商品价格" prop="price" :label-width="formLabelWidth">
                <el-input type="number" v-model="form.price" autocomplete="off" placeholder="请输入商品价格"></el-input>
            </el-form-item>
            <el-form-item label="商品打折"  v-model="form.isDiscount" :label-width="formLabelWidth">
                <el-switch
                v-model="form.isDiscount"
                active-color="#13ce66"
                inactive-color="#ff4949">
                </el-switch>
            </el-form-item>
            <el-form-item label="折前价格" prop="onSale" :label-width="formLabelWidth">
                <el-input type="number" v-model="form.onSale" autocomplete="off" placeholder="请输入折前价格"></el-input>
            </el-form-item>
            <el-form-item label="商品售罄"  v-model="form.soldOut" :label-width="formLabelWidth">
                <el-switch
                v-model="form.soldOut"
                active-color="#13ce66"
                inactive-color="#ff4949">
                </el-switch>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button class="cancel-shadow" @click="dialog.show = false">取 消</el-button>
            <el-button type="primary" class="btn-shadow" @click="submitForm('form')">确 定</el-button>
        </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
  name: 'categoryDialog',
  props: { dialog: Object, form: Object, categoryList: Array },
  data () {
    return {
      uploadUrl: '/api/commodity/upload',
      formLabelWidth: '80px',
      form_rules: {
        name: [
          { required: true, message: '商品名称不能为空！', trigger: 'blur' }
        ],
        category: [
          { required: true, message: '分类不能为空', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '商品价格不能为空', trigger: 'blur' }
        ],
        onSale: [
          { required: true, message: '折前价格不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      if (!this.form.img) {
        this.$message({ type: 'error', message: '商品图片上传失败请重试' })
        return
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          const url = this.dialog.option === 'add' ? '/add' : '/edit'
          this.$axios.post('/api/commodity' + url, this.form)
            .then(res => {
              this.$message({
                type: 'success',
                message: res.data
              })
              this.dialog.show = false
              this.$emit('update')
            })
        }
      })
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
    },
    uploadSectionFile (params) {
      const file = params.file
      const form = new FormData()
      form.append('file', file)
      this.$axios.post('/api/commodity/upload', form, {
        headers: { 'content-type': 'multipart/form-data' }
      })
        .then(res => {
          if (res.data.status === 'ok') {
            this.form.img = res.data.url
          } else {
            this.$message({
              type: 'error',
              message: '图片上传失败，请重试！'
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
.commodity-uploader{
    padding: 10px;
}
.commodity-uploader .el-upload {
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.commodity-uploader .el-upload:hover {
  border-color: #409EFF;
}
.commodity-uploader-icon {
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
.commodity-uploader-icon:hover{
  border-color: #409EFF;
}
.commodity {
  width: 100px;
  height: 100px;
  display: block;
}
.cancel-shadow{
    box-shadow: 0px 0px 20px rgba(85, 86, 99, 0.262);
}
.btn-shadow{
    box-shadow: 0px 0px 20px rgba(53, 141, 230, 0.562);
}
</style>
