const express = require('express')
const router = express.Router()
const passport = require('passport')
const QRCode = require('../../models/QRCode')

// $route POST api/qrcode/add
// @desc 添加点餐码
// @access private
router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const data = req.body
    const qrcode = new QRCode(data)
    qrcode
      .save()
      .then(result => res.send('添加成功！'))
      .catch(err => res.status(400).send('添加失败，请重试！'))
  }
)

// $route POST api/qrcode/del
// @desc 删除点餐码
// @access private
router.post(
  '/del',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    QRCode.findOneAndRemove({ _id: req.body._id }, { new: true })
      .then(result => res.send('删除成功！'))
      .catch(err => res.status(400).send('删除失败，请重试！'))
  }
)

// $route GET api/qrcode/all
// @desc 获取点餐码
// @access private
router.get(
  '/all',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    QRCode.find()
      .then(result => {
        if (result) {
          res.json(result)
        } else {
          res.json({})
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
)

module.exports = router
