<template>
    <div id="category-dialog">
        <el-dialog :title="dialog.title" :visible.sync="dialog.show" width="30%">
        <el-form ref="form" :model="form" :rules="form_rules">
            <el-form-item label="分类名称" prop="cName" :label-width="formLabelWidth">
                <el-input v-model="form.cName" autocomplete="off" placeholder="请输入分类名称！"></el-input>
            </el-form-item>
            <el-form-item label="分类排序" prop="no" :label-width="formLabelWidth">
                <el-input type="number" min=0 max=99 v-model.number="form.no" autocomplete="off" placeholder="请输入分类排序！"></el-input>
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
  props: { dialog: Object, form: Object },
  data () {
    const checkcNo = (rule, value, callback) => {
      if (value < 0 || value > 99) {
        callback(new Error('排序号码为0-99之间的整数！'))
      } else {
        callback()
      }
    }
    return {
      formLabelWidth: '80px',
      form_rules: {
        cName: [
          { required: true, message: '分类名称不能为空！', trigger: 'blur' }
        ],
        no: [
          { required: true, message: '分类排序不能为空', trigger: 'blur' },
          { type: 'number', message: '排序号码必须为数值' },
          { validator: checkcNo, message: '排序号码为0-99之间的整数！', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const url = this.dialog.option === 'add' ? '/add' : '/edit'
          this.$axios.post('/api/category' + url, this.form)
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
