const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const gravatar = require('gravatar')
const { secretKey } = require('../../config/config')

// $route POST api/users/init
// @desc 初始化管理员用户，返回json数据
// @access public
router.post('/init', async (req, res) => {
  try {
    const count = await User.countDocuments().exec()
    if (count !== 0) {
      res.status(400).send('系统已存在管理员，请勿重复初始化！')
      return
    }
    let avatar = gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mm' })
    let password = bcrypt.hashSync(req.body.password, 10)
    const newUser = new User({
      username: req.body.username,
      password,
      email: req.body.email,
      avatar
    })
    newUser
      .save()
      .then(user => res.json(user))
      .catch(err => res.send(err))
  } catch (err) {
    console.log(err)
  }
  User.countDocuments()
    .then(user => {
      if (user === 0) {
      } else {
      }
    })
    .catch(err => {
      console.log('[Err] ' + err)
    })
})

// $route POST api/users/login
// @desc 管理员登录，返回json数据
// @access public
router.post('/login', async (req, res) => {
  let username = req.body.username
  let password = req.body.password
  try {
    const user = await User.findOne({ username }).exec()
    if (!user) {
      res.status(400).send('用户名错误！')
      return
    }
    const isMatch = bcrypt.compareSync(password, user.password)
    if (isMatch) {
      const rules = {
        id: user.id,
        username: user.username,
        email: user.email,
        avatar: user.avatar
      }
      jwt.sign(rules, secretKey, { expiresIn: 36000 }, (err, token) => {
        if (err) throw err
        res.json({ success: true, token: 'Bearer ' + token })
      })
    } else {
      res.status(400).send('密码错误！')
    }
  } catch (err) {
    console.log(err)
  }
})

// $route GET api/users/authorization
// @desc 单独获取token，返回json数据
// @access private
router.get(
  '/authorization',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.user.id }).exec()
      const rules = {
        id: user.id,
        username: user.username,
        email: user.email,
        avatar: user.avatar
      }
      jwt.sign(rules, secretKey, { expiresIn: 36000 }, (err, token) => {
        if (err) throw err
        res.json({ success: true, token: 'Bearer ' + token })
      })
    } catch (err) {
      console.log(err)
    }
  }
)

// $route POST api/users/chinfo
// @desc 修改管理员信息，返回json数据
// @access private
router.post(
  '/chinfo',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    let chUser = req.body
    try {
      const user = await User.findById({ _id: chUser.id }).exec()
      if (!user) {
        res.status(400).send('用户不存在！')
        return
      }
      if (chUser.newpassword) {
        if (!chUser.password) {
          res.status(400).send('请输入旧密码！')
          return
        }
        const isMatch = bcrypt.compareSync(chUser.password, user.password)
        if (isMatch) {
          const pwd = bcrypt.hashSync(chUser.newpassword, 10)
          const update = await User.findOneAndUpdate(
            { _id: chUser.id },
            { $set: { password: pwd } }
          ).exec()
          if (update) {
            res.send('密码修改成功,请重新登录！')
          }
        } else {
          res.status(400).send('旧密码错误！')
        }
      } else {
        chUser.avatar = gravatar.url(chUser.email, {
          s: '200',
          r: 'pg',
          d: 'mm'
        })
        const update = await User.findOneAndUpdate(
          { _id: chUser.id },
          {
            $set: {
              username: chUser.username,
              email: chUser.email,
              avatar: chUser.avatar
            }
          }
        ).exec()
        if (update) {
          res.send('信息修改成功！')
        }
      }
    } catch (err) {
      console.log(err)
    }
  }
)

module.exports = router
