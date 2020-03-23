<template>
    <div id="category">
        <el-row>
            <span class="search-tittle">分类搜索：</span>
            <el-col :xs="8" :sm="6" :md="6" :lg="5">
                <el-input
                    placeholder="请输入分类名称或分类排序"
                    prefix-icon="el-icon-search"
                    size="small"
                    v-model="search">
                </el-input>
            </el-col>

            <el-button type="primary" size="small" class="btn-shadow" @click="addCategory()">添加分类</el-button>
        </el-row>
        <el-row class="row-height">
            <el-col :span="24">
                <el-table
                    :data="tableData.filter(data => !search || data.cName.toLowerCase().includes(search.toLowerCase()) || data.no==search)"
                    size="medium"
                    :max-height="tableHeight"
                    :default-sort = "{prop: 'no', order: 'ascending'}"
                    style="width: 100%">
                    <el-table-column
                    fixed
                    align="center"
                    prop="cName"
                    label="分类名称">
                    </el-table-column>
                    <el-table-column
                    fixed
                    align="center"
                    prop="no"
                    sortable
                    label="分类排序">
                    </el-table-column>
                    <el-table-column
                    fixed="right"
                    align="center"
                    label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="editCategory(scope.row)">编辑</el-button>
                        <el-button type="text" size="small" @click="delCategory(scope.row)">删除</el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <CategoryDialog :dialog="dialog" :form ="form" @update="loadData" ></CategoryDialog>
    </div>
</template>

<script>
import CategoryDialog from '@/components/admin/CategoryDialog'
export default {
  name: 'category',
  data () {
    return {
      dialog: {
        show: false,
        title: '',
        option: 'add'
      },
      form: {
        id: '',
        cName: '',
        no: ''
      },
      tableData: [],
      tableHeight: window.innerHeight - 142,
      search: ''
    }
  },
  methods: {
    loadData () {
      this.$axios.get('/api/category/all')
        .then(res => {
          this.tableData = res.data
        })
        .catch(err => console.log(err))
    },
    addCategory () {
      this.dialog = {
        show: true,
        title: '添加分类',
        option: 'add'
      }
      this.form = {
        cName: '',
        no: ''
      }
    },
    editCategory (row) {
      this.dialog = {
        show: true,
        title: '编辑分类',
        option: 'edit'
      }
      this.form = row
    },
    delCategory (row) {
      this.$confirm(`确认删除分类 “${row.cName}” 吗？`)
        .then(_ => {
          this.$axios.post('/api/category/del', { _id: row._id })
            .then(result => {
              this.$message({
                type: 'success',
                message: result.data
              })
              this.loadData()
            })
            .catch(err => {
              console.log(err)
            })
        })
        .catch(_ => {})
    }
  },
  created () {
    this.loadData()
    window.onresize = () => {
      this.tableHeight = window.innerHeight - 142
    }
  },
  components: {
    CategoryDialog
  }
}
</script>
<style scoped>
    #category{
        height: 100%;
    }
    .row-height{
        margin-top: 10px;
        overflow: auto;
    }
    .btn-shadow{
        float: right;
        top: 0;
        box-shadow: 0px 0px 20px rgba(53, 141, 230, 0.562);
    }
    .warn-shadow{
        box-shadow: 0px 0px 20px rgba(255, 255, 220, .3)
    }
    .box-card{
        box-shadow: 1px 1px 15px rgba(58,59,69,.3)!important;
        border-radius: 6px;
    }
    .search-tittle{
        display: inline-block;
        float: left;
        height: 32px;
        line-height: 32px;
        color: #111;
    }
</style>
