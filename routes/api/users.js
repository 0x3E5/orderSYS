const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const gravatar = require('gravatar');
const {secretKey} = require('../../config/config');

// $route POST api/users/init
// @desc 初始化管理员用户，返回json数据
// @access public
router.post('/init',(req,res)=>{
    User.countDocuments()
        .then(user=>{
            if(user===0){
                let avatar = gravatar.url(req.body.email,{s:'200',r:'pg',d:'mm'});
                let password = bcrypt.hashSync(req.body.password,10);
                if(password){
                    const newUser = new User({
                        username:req.body.username,
                        password,
                        email:req.body.email,
                        avatar
                    });
                    newUser.save()
                            .then(user=>res.json(user))
                            .catch(err=>res.send(err));
                }
            }else{
                res.status(405).json({status:'failed',msg:'系统已存在管理员，请勿重复初始化！'});
            }
        })
        .catch(err=>{
            console.log('[Err] '+err);
        })
})

// $route POST api/users/login
// @desc 管理员登录，返回json数据
// @access public
router.post('/login',(req,res)=>{
    let username = req.body.username;
    let password = req.body.password;
    User.findOne({username})
        .then(user=>{
            if(!user){
                return res.status(400).send("用户名错误！");
            }else{
                bcrypt.compare(password,user.password)
                      .then(isMatch=>{
                          if(isMatch){
                              const rules = {id:user.id,username:user.username,email:user.email,avatar:user.avatar};
                            jwt.sign(rules,secretKey,{expiresIn:3600},(err,token)=>{
                                if(err) throw err;
                                res.json({success:true,token:"Bearer "+token});
                            })
                          }else{
                              return res.status(400).send('密码错误！');
                          }
                      });
            };
        })
        .catch(err=>console.log('[Err] '+err));
});

// $route GET api/users/current
// @desc 获取管理员信息，返回json数据
// @access private
router.get('/current',passport.authenticate('jwt',{session:false}),(req,res)=>{
    res.json({
        id:req.user.id,
        username:req.user.username,
        email:req.user.email,
        avatar:req.user.avatar
    });
})

// $route POST api/users/chinfo
// @desc 修改管理员信息，返回json数据
// @access private
router.post('/chinfo',passport.authenticate('jwt',{session:false}),(req,res)=>{
    let chUser = req.body;
    User.findById(chUser.id)
        .then(user=>{
            if(user){
                if(chUser.newpassword){
                    bcrypt.compare(chUser.password,user.password)
                    .then(isMatch=>{
                        if(isMatch){
                          let newpassword = bcrypt.hashSync(chUser.newpassword,10);
                          User.findOneAndUpdate({_id:chUser.id},{$set:{password:newpassword}})
                              .then(profiles=>{
                                  res.send('密码修改成功,请重新登录！');
                              })
                        }else{
                            res.status(400).send('旧密码错误！');
                        }
                    })
                    .catch(err=>{console.log(err);})
                }else{
                    chUser.avatar = gravatar.url(chUser.email,{s:'200',r:'pg',d:'mm'});
                    User.findOneAndUpdate({_id:chUser.id},{$set:chUser},{new:true})
                        .then(profiles=>{
                            res.send('信息修改成功！');
                        })
                }
               
            }else{
                res.status(400).send('用户不存在！');
            }
        })
        .catch(err=>console.log(err));
})

module.exports=router;