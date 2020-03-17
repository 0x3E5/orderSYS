//db.orders.find({$and:[{date:{$gte:new Date('2020-03-15 0:0:0')}},{date:{$lte:new Date('2020-03-15 23:59:59')}},{state:1}]})
const express = require('express');
const router = express.Router();
const passport = require('passport');
const Order = require('../../models/Order');
const Category = require('../../models/Category');
const Commodity = require('../../models/Commodity');
const moment = require('moment');

// $route POST api/statistic/data
// @desc 获取统计信息，返回json数据
// @access private
router.post('/data',passport.authenticate('jwt',{session:false}),async (req,res)=>{
    try{
        const date = moment(req.body.date).format('YYYY-MM-DD')
        const orders = await Order.find({
            $and:[
                {date:{$gte:new Date(date+' 0:0:0')}},
                {date:{$lte:new Date(date+' 23:59:59')}},
                {state:1}
            ]
        }).exec()

        const commodityCounts = await Commodity.countDocuments().exec()

        const categoryCounts = await Category.countDocuments().exec()

        const orderCounts = orders.length;
    
        let totalIncome = 0; 
        orders.forEach(item=>{
            totalIncome+=item.totalPrice;
        })
    
        res.json({orderCounts,totalIncome,commodityCounts,categoryCounts})
    }catch(err){
        console.log(err)
    }
})

module.exports = router;