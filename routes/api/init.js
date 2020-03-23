const express = require('express')
const router = express.Router()
const Init = require('../../models/Init')

// $route GET api/init/getStat
// @desc 获取初始化状态，返回json数据
// @access public
router.get('/getStat', async (req, res) => {
  try {
    const count = await Init.countDocuments().exec()
    if (count === 0) {
      res.json({ admin: false, shop: false })
      Init.create({ admin: false, shop: false }, err => {
        if (err) throw err
      })
    } else {
      const result = await Init.findOne().exec()
      res.json(result)
    }
  } catch (err) {
    console.log(err)
  }
})
// $route POST api/init/setStat
// @desc 获取店铺初始化状态，返回json数据
// @access public
router.post('/setStat', async (req, res) => {
  let status = req.body
  try {
    const count = await Init.countDocuments().exec()
    if (count === 0) {
      Init.create(status, err => {
        if (err) throw err
      })
      res.json({ status: 'ok' })
      return
    }
    const result = await Init.findOne().exec()
    if (result.admin && result.shop) {
      res.status(400).send('您已初始化过，请勿重复操作！')
      return
    }
    const update = await Init.findOneAndUpdate({}, { $set: req.body }).exec()
    res.json(update)
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
