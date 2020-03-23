<template>
    <div class="order">
        <el-row>
            <span class="search-tittle">订单搜索：</span>
            <el-col :xs="8" :sm="6" :md="6" :lg="5">
                <el-date-picker
                v-model="search"
                @change="initTableData"
                type="date"
                size="small"
                placeholder="选择日期">
                </el-date-picker>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-table
                :data="tableData"
                :max-height="tableHeight"
                style="width: 100%">
                <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="订单编号">
                        <span>{{ props.row.orderNo }}</span>
                    </el-form-item>
                    <el-form-item label="订单桌号">
                        <span>{{ props.row.deskNo }}</span>
                    </el-form-item>
                    <el-form-item label="订单内容">
                        <ul>
                            <li v-for="item in props.row.order" :key="item._id">
                                <span>{{ item.name }}</span><span>x{{ item.count }}</span><span>￥{{ item.price }}</span>
                            </li>
                        </ul>
                    </el-form-item>
                    <el-form-item label="订单备注">
                        <span>{{ props.row.remark ===''?'无':props.row.remark }}</span>
                    </el-form-item>
                    <el-form-item label="订单金额">
                        <span class="totalPrice">￥{{ props.row.totalPrice }}</span>
                    </el-form-item>
                    <el-form-item label="下单时间">
                        <span>{{ props.row.date | formatDate }}</span>
                    </el-form-item>
                    </el-form>
                </template>
                </el-table-column>
                <el-table-column
                label="订单编号"
                width="170"
                align="center"
                prop="orderNo">
                </el-table-column>
                <el-table-column
                label="订单桌号"
                width="80"
                align="center"
                prop="deskNo">
                </el-table-column>
                <el-table-column
                align="center"
                label="订单内容">
                <template slot-scope="scope">
                    <span class="ellipsis">{{ scope.row.order | orderList }}</span>
                </template>
                </el-table-column>
                <el-table-column
                width="150"
                align="center"
                label="下单时间">
                <template slot-scope="scope">
                    {{ scope.row.date | formatDate }}
                </template>
                </el-table-column>
                <el-table-column
                align="center"
                width="100"
                fixed="right"
                label="订单金额">
                <template slot-scope="scope">
                    <span class="totalPrice">￥{{ scope.row.totalPrice }}</span>
                </template>
                </el-table-column>
                <el-table-column
                align="center"
                fixed="right"
                width="80"
                label="订单状态">
                    <template slot-scope="scope">
                        <el-tag
                        :type="scope.row.state === 0 ? 'primary' : 'success'"
                        disable-transitions>
                            {{ scope.row.state===0?"待处理":"已完成" }}
                        </el-tag>
                    </template>
                </el-table-column>
                <!-- <el-table-column
                align="center"
                fixed="right"
                width="80"
                label="订单操作">
                    <template slot-scope="scope">
                        <el-popconfirm
                        title="确定要删除当前订单吗？"
                        @onConfirm="del(scope.row)"
                        >
                        <el-button slot="reference" size="mini" type="danger">删除</el-button>
                        </el-popconfirm>
                    </template>
                </el-table-column> -->
            </el-table>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-pagination
                class="pagination"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="paginations.page_index"
                :page-sizes="paginations.page_sizes"
                :page-size="paginations.page_size"
                :layout="paginations.layout"
                :total="paginations.total">
                </el-pagination>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
  name: 'history',
  data () {
    return {
      tableData: [],
      tableHeight: window.innerHeight - 184,
      search: '',
      paginations: {
        page_index: 1,
        total: 0,
        page_size: 5,
        page_sizes: [5, 10, 15, 20],
        layout: 'total, sizes, prev, pager, next, jumper'
      }
    }
  },
  methods: {
    handleSizeChange (val) {
      this.paginations.page_size = val
      this.initTableData()
    },
    handleCurrentChange (val) {
      this.initTableData()
    },
    del (data) {
      this.$axios.post('/api/order/cancel', { _id: data._id })
        .then(res => {
          this.$message({
            type: 'success',
            message: '订单已删除！'
          })
          this.initTableData()
        })
        .catch(err => {
          console.log(err)
        })
    },
    initTableData () {
      const page = {
        index: this.paginations.page_index,
        size: this.paginations.page_size,
        search: this.search
      }
      this.$axios.post('/api/order/finished', page)
        .then(res => {
          this.tableData = res.data.result
          this.paginations.total = res.data.total
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.initTableData()
    window.onresize = () => {
      this.tableHeight = window.innerHeight - 184
    }
  },
  filters: {
    orderList (order) {
      let orderData = ''
      order.forEach(el => {
        orderData += `${el.name}x${el.count} `
      })
      return orderData
    },
    formatDate (time) {
      const date = new Date(time)
      const date_value = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
      return date_value
    }
  }
}
</script>

<style>
    .order{
        height: 100%;
    }
    .search-tittle{
        display: inline-block;
        float: left;
        height: 32px;
        line-height: 32px;
        color: #111;
    }
    .btn-shadow{
        float: right;
        top: 0;
        box-shadow: 0px 0px 20px rgba(53, 141, 230, 0.562);
    }
    .demo-table-expand {
    font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 100%;
    }
    .demo-table-expand .el-form-item .el-form-item__content ul{
        width:300px;
    }
    .demo-table-expand .el-form-item .el-form-item__content ul li{
        display: flex;
    }
    .demo-table-expand .el-form-item .el-form-item__content ul li span{
        flex: 1;
    }
    .demo-table-expand .el-form-item .el-form-item__content ul li span:first-child{
        flex: 4;
    }
    .totalPrice{
        color: red;
    }
    .ellipsis{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .pagination{
        margin-top:10px;
        float: right;
    }
</style>
