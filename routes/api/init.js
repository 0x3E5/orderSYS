const express = require('express');
const router = express.Router();
const Init = require('../../models/Init');

// $route GET api/init/getStat
// @desc 获取初始化状态，返回json数据
// @access public
router.get('/getStat',(req,res)=>{
    Init.countDocuments()
        .then(count=>{
            if(count===0){
                res.json({admin:false,shop:false});
                Init.create({admin:false,shop:false},err=>{
                    if(err) throw err;
                })
            }else{
                Init.findOne()
                    .then(result=>{
                        res.json(result);
                    })
                    .catch(err=>{
                        console.log(err);
                    })
            }
        })
})
// $route POST api/init/setStat
// @desc 获取店铺初始化状态，返回json数据
// @access public
router.post('/setStat',(req,res)=>{
    let status = req.body;
    Init.countDocuments()
        .then(count=>{
            if(count===0){
                Init.create(status,err=>{
                    if(err) throw err;
                });
                res.json({status:'ok'});
            }else{
                Init.findOne()
                    .then(result=>{
                        if(result.admin&&result.shop){
                            res.status(405).json({status:'failed',msg:'您已初始化过，请勿重复操作！'});
                        }else{
                            Init.findOneAndUpdate('',{$set:req.body},{new:true})
                                .then(result=>{
                                    res.json({status:'ok'})
                                })
                                .catch(err => {
                                    console.log(err);
                                    res.status(405).json({status:failed})
                                })
                        }
                    })
            }
        })
})

module.exports = router;