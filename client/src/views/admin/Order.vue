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
                        <span>{{ props.row.remark }}</span>
                    </el-form-item>
                    <el-form-item label="订单金额">
                        <span>￥{{ props.row.totalPrice }}</span>
                    </el-form-item>
                    </el-form>
                </template>
                </el-table-column>
                <el-table-column
                label="订单桌号"
                prop="deskNo">
                </el-table-column>
                <el-table-column
                label="订单内容">
                <template slot-scope="scope">
                    {{ scope.row.order[0].name+'...' }}
                </template>
                </el-table-column>
                <el-table-column
                label="订单备注">
                <template slot-scope="scope">
                    {{ scope.row.remark===''?"无":scope.row.remark }}
                </template>
                </el-table-column>
                <el-table-column
                label="订单金额">
                <template slot-scope="scope">
                    ￥{{ scope.row.totalPrice }}
                </template>
                </el-table-column>
                <el-table-column
                label="订单状态">
                    <template slot-scope="scope">
                        {{ scope.row.state===0?"待处理":"已完成" }}
                    </template>
                </el-table-column>
                <el-table-column
                label="订单操作">
                    <template>
                        完成|取消                  
                    </template>
                </el-table-column>
            </el-table>
            </el-col>
        </el-row>
        
    </div>
</template>

<script>
export default {
    name:'order',
    data(){
        return{
            tableData:[]
        }
    },
    methods:{

    },
    mounted() {
        this.$axios.get('/api/order/unfinished')
            .then(res=>{
                this.tableData = res.data
            })
            .catch(err=>{
                console.log(err)
            })
    },
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
    .demo-table-expand .el-form-item:last-child .el-form-item__content span{
        color: red;
    }
</style>