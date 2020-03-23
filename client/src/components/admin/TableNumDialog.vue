<template>
    <div id="table-dialog">
        <el-dialog :title="dialog.title" :visible.sync="dialog.show" width="30%">
        <el-form ref="form" :model="form" :rules="form_rules">
            <el-form-item label="餐桌号码" prop="no" :label-width="formLabelWidth">
                <el-input type="number" min=0 max=99 v-model.number="form.no" autocomplete="off" placeholder="请输入桌号"></el-input>
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
  name: 'tableNumDialog',
  props: { dialog: Object, form: Object },
  data () {
    const checkcNo = (rule, value, callback) => {
      if (value < 0 || value > 99) {
        callback(new Error('餐桌号码范围在0-99之间！'))
      } else {
        callback()
      }
    }
    return {
      formLabelWidth: '80px',
      form_rules: {
        no: [
          { required: true, message: '餐桌号码不能为空', trigger: 'blur' },
          { type: 'number', message: '餐桌号码必须为数值' },
          { validator: checkcNo, message: '餐桌号码范围在0-99之间', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const formData = {
            url: `${this.form.url}/index/${this.form.no}`,
            no: this.form.no
          }
          this.$axios.post('/api/qrcode/add', formData)
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
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
.cancel-shadow{
    box-shadow: 0px 0px 20px rgba(85, 86, 99, 0.262);
}
.btn-shadow{
    box-shadow: 0px 0px 20px rgba(53, 141, 230, 0.562);
}
</style>
