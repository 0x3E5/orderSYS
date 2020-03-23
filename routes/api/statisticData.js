//db.orders.find({$and:[{date:{$gte:new Date('2020-03-15 0:0:0')}},{date:{$lte:new Date('2020-03-15 23:59:59')}},{state:1}]})
const express = require('express')
const router = express.Router()
const passport = require('passport')
const Order = require('../../models/Order')
const Category = require('../../models/Category')
const Commodity = require('../../models/Commodity')
const ChartsData = require('../../models/ChartsData')
const moment = require('moment')

// $route POST api/statistic/data
// @desc 获取统计信息，返回json数据
// @access private
router.post(
  '/data',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const date = moment(req.body.date).format('YYYY-MM-DD')
      const orders = await Order.find({
        $and: [
          {
            date: {
              $gte: new Date(date + ' 00:00:00'),
              $lte: new Date(date + ' 23:59:59')
            }
          },
          { state: 1 }
        ]
      }).exec()
      const commodityCounts = await Commodity.countDocuments().exec()
      const categoryCounts = await Category.countDocuments().exec()
      const orderCounts = orders.length
      let totalIncome = 0
      orders.forEach(item => {
        totalIncome += item.totalPrice
      })
      totalIncome = Math.round(totalIncome * 100) / 100
      const chartsData = await ChartsData.find().exec()
      let xData = []
      let yOrder = []
      let yIncome = []
      if (chartsData) {
        chartsData.forEach(item => {
          xData.push(item.date)
          yOrder.push(item.order)
          yIncome.push(Math.round(item.income * 100) / 100)
        })
      }
      res.json({
        cardData: { orderCounts, totalIncome, commodityCounts, categoryCounts },
        chartsData: { xData, yOrder, yIncome }
      })
    } catch (err) {
      console.log(err)
    }
  }
)
// $route POST api/statistic/submit
// @desc 提交统计信息，返回json数据
// @access private
router.post('/submit', async (req, res) => {
  try {
    const date = moment(req.body.date).format('YYYY-MM-DD')
    const income = parseFloat(req.body.income)
    const result = await ChartsData.findOneAndUpdate(
      { date },
      { $inc: { income, order: +1 } },
      { upsert: true, new: true }
    ).exec()
    if (result) {
      res.json({ status: 'ok' })
    } else {
      res.status(400).send('统计数据失败')
    }
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
