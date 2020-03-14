<template>
    <div class="order">
        <el-row>
            <el-col :span="24">
                <el-table
                :data="tableData"
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
                label="订单桌号"
                width="100"
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
                align="center"
                label="订单备注">
                <template slot-scope="scope">
                    <span class="ellipsis">{{ scope.row.remark===''?"无":scope.row.remark }}</span>
                </template>
                </el-table-column>
                <el-table-column
                align="center"
                width="100"
                label="订单金额">
                <template slot-scope="scope">
                    <span class="totalPrice">￥{{ scope.row.totalPrice }}</span>
                </template>
                </el-table-column>
                <el-table-column
                align="center"
                fixed="right"
                width="100"
                label="订单状态">
                    <template slot-scope="scope">    
                        <el-tag
                        :type="scope.row.state === 0 ? 'primary' : 'success'"
                        disable-transitions>
                            {{ scope.row.state===0?"待处理":"已完成" }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                fixed="right"
                width="100"
                label="订单操作">
                    <template slot-scope="scope">
                        <el-popconfirm
                        title="确定要删除当前订单吗？"
                        @onConfirm="del(scope.row)"
                        >
                        <el-button slot="reference" size="mini" type="danger">取消</el-button>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            </el-col>
        </el-row>
        
    </div>
</template>

<script>
export default {
    name:'history',
    data(){
        return{
            tableData:[]
        }
    },
    methods:{
        del(data){
            this.$axios.post('/api/order/cancel',{_id:data._id})
                .then(res=>{
                    this.$message({
                        type:'success',
                        message:'订单已取消！'
                    })
                    this.initTableData()
                })
                .catch(err=>{
                    console.log(err)
                })
        },
        initTableData(){
            this.$axios.get('/api/order/unfinished')
            .then(res=>{
                this.tableData = res.data
            })
            .catch(err=>{
                console.log(err)
            })
        }
    },
    mounted() {
        this.initTableData()
    },
    filters:{
        orderList(order){
            let orderData = ''
            order.forEach(el=>{
                orderData+=`${el.name}x${el.count} `
            })
            return orderData
        },
        formatDate(time){
            let date = new Date(time)
            let date_value = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
            return date_value
        }
    }
}
</script>

<style>
    .order{
        height: 100%;
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
</style>