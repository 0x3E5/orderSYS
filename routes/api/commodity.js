const express = require('express');
const router = express.Router();
const Commodity = require('../../models/Commodity');
const Category = require('../../models/Category');
const passport = require('passport');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');


// $route POST api/commodity/add
// @desc 添加商品信息
// @access private
router.post('/add',(req,res)=>{
    const data = req.body;
    const newCommodity = new Commodity(data);
    newCommodity.save()
        .then(result=>{
            res.send('商品添加成功！');
        })
        .catch(err=>res.status(400).send('商品添加失败，请重试！'))
})

// $route POST api/commodity/edit
// @desc 修改商品信息
// @access private
router.post('/edit',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const data = req.body;
    Commodity.findOneAndUpdate({_id:data._id},{$set:data},{new:true})
        .then(result=>{
            res.send('商品修改成功！');
        })
        .catch(err=>res.status(400).send('商品修改失败，请重试！'))
})

// $route POST api/commodity/del
// @desc 删除商品信息
// @access private
router.post('/del',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Commodity.findOneAndRemove({_id:req.body._id})
        .then(result=>res.send('删除商品成功！'))
        .catch(err=>res.status(400).send('删除商品失败，请重试！'))
})

// $route POST api/commodity/get
// @desc 获取商品信息，返回json数据
// @access private
router.post('/get',passport.authenticate('jwt',{session:false}),async (req,res)=>{
    try{
        let page = req.body;
        if(page.name){
            const reg = new RegExp(`^.*${page.name}.*$`);
            const result = await Commodity.find({name:reg}).limit(page.size).skip(page.size * (page.index-1)).exec();
            const total = await Commodity.countDocuments({name:reg}).exec();
            res.json({result,total})
        }else{
            const result = await Commodity.find().limit(page.size).skip(page.size * (page.index-1)).exec();
            const total = await Commodity.countDocuments().exec();
            res.json({result,total})
        }
    }catch(err){
        console.log(err);
    }
})


// $route POST api/commodity/upload
// @desc 上传商品照片，返回json数据
// @access private
router.post('/upload',passport.authenticate('jwt',{session:false}),(req,res)=>{
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => { 
        fs.rename(files.file.path, path.join(__dirname,'../../public/goods', files.file.name), (err) => { 
            if (err) throw err;
            let url =`http://${req.headers.host}/goods/${files.file.name}`;
            res.json({status:'ok',url});
        })
    })
})

// $route get api/commodity/menu
// @desc 用户页面获取所有商品信息，返回json数据
// @access public
router.get('/menu',(req,res)=>{
    Category.find().sort({no:1})
        .then(result=>{
            let menu = [];
            for(category of result){
                menu.push({name:category.cName,type:category.no,foods:[]});
            }
            Commodity.find()
                .then(result2=>{
                    for(category of menu){
                        for(commodity of result2){
                            if(category.name === commodity.category){
                                category.foods.push(commodity);
                            }
                        }
                    }
                    res.json(menu)
                })
        })
})

module.exports = router;