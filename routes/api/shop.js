const express = require('express');
const router = express.Router();
const passport = require('passport');
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const Shop = require('../../models/Shop');

// $route GET api/shop/get
// @desc 获取店铺信息，返回json数据
// @access public
router.get('/get',(req,res)=>{
    Shop.findOne()
        .then(profiles=>{
            res.json(profiles);
        })
})

// $route POST api/shop/edit
// @desc 修改店铺信息，返回json数据
// @access private
router.post('/edit',passport.authenticate('jwt',{session:false}),(req,res)=>{
    let shopInfo = req.body;
    Shop.findByIdAndUpdate(shopInfo.id,{$set:shopInfo},{new:true})
        .then(profiles=>{
            res.send('店铺信息修改成功！');
        })
        .catch(err=>{
            console.log(err);
            res.status(400).send('店铺信息修改失败！');
        })
})

// $route post api/shop/create
// @desc 创建店铺信息，返回json数据
// @access public
router.post('/create',(req,res)=>{
    Shop.countDocuments()
        .then(count => {
            if (count === 0) {
                let shopInfo = req.body;
                Shop.create(shopInfo,(err)=>{
                    if(err) throw err;
                    res.send('店铺信息创建成功！');
                })
            }else{
                res.status(405).json({status:'failed',msg:'系统已存在店铺信息，请勿重复初始化！'});
            }
        })
        .catch(err=>{
            console.log('[Err] '+err);
        })
})

// $route POST api/shop/upload
// @desc 上传店铺照片，返回json数据
// @access public
router.post('/upload',(req,res)=>{
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => { 
        fs.rename(files.file.path, path.join(__dirname,'../../public/shop', files.file.name), (err) => { 
            if (err) throw err;
            let url =`http://${req.headers.host}/shop/${files.file.name}`;
            res.json({status:'ok',url});
        })
    })
})

module.exports = router;