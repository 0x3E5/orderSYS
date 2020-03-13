const express = require('express');
const router = express.Router();
const passport = require('passport');
const Order = require('../../models/Order');
const moment = require('moment');

// $route POST api/order/submit
// @desc 提交订单信息，返回json数据
// @access public
router.post('/submit',(req,res)=>{
    let data = req.body;
    data.orderNo = moment(Date.now()).format('YYYYMMDDHHmmss') + Math.floor(Math.random()*8999 + 1000);
    Order.create(data,err=>{
        if(err){
            console.log(err)
            res.status(400).send('订单提交失败请重试！');
            return;
        }
        res.send('下单成功店家正在处理您的订单请耐心等待...');
    });
})

// $route GET api/order/unfinished
// @desc 查询未完成订单信息，返回json数据
// @access private
router.get('/unfinished',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Order.find({state:0})
        .then(result=>{
            res.send(result)
        })
        .catch(err=>{
            res.status(400).send('查询失败，请重试！')
        })
})

module.exports = router; 