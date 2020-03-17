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
    Order.find({state:0}).sort({date:-1})
        .then(result=>{
            res.send(result)
        })
        .catch(err=>{
            res.status(400).send('查询失败，请重试！')
        })
})

// $route GET api/order/finished
// @desc 查询已完成订单信息，返回json数据
// @access private
router.get('/finished',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Order.find({state:1}).sort({date:-1})
        .then(result=>{
            res.send(result)
        })
        .catch(err=>{
            res.status(400).send('查询失败，请重试！')
        })
})

// $route POST api/order/finish
// @desc 提交已完成订单信息，返回json数据
// @access private
router.post('/finish',passport.authenticate('jwt',{session:false}),(req,res)=>{
    let _id = req.body._id
    Order.findOneAndUpdate({_id},{$set:{state:1}},{new:true})
        .then(result=>{
            res.send('订单已完成！');
        })
        .catch(err=>res.status(400).send('订单操作失败，请重试！'))
})

// $route POST api/order/cancel
// @desc 删除/取消订单信息，返回json数据
// @access private
router.post('/cancel',passport.authenticate('jwt',{session:false}),(req,res)=>{
    let _id = req.body._id
    Order.findOneAndRemove({_id},{new:true})
        .then(result=>{
            res.send('订单已取消！');
        })
        .catch(err=>res.status(400).send('订单操作失败，请重试！'))
})

module.exports = router; 