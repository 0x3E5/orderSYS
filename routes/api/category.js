const express = require('express')
const router = express.Router()
const Category = require('../../models/Category')
const passport = require('passport')

// $route POST api/category/add
// @desc 添加分类信息
// @access private
router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const category = new Category({
      cName: req.body.cName,
      no: req.body.no
    })
    category
      .save()
      .then(result => {
        res.send('添加成功！')
      })
      .catch(err => res.status(400).send('添加失败，请重试！'))
  }
)

// $route POST api/category/edit
// @desc 修改分类信息
// @access private
router.post(
  '/edit',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Category.findOneAndUpdate(
      { _id: req.body._id },
      { $set: req.body },
      { new: true }
    )
      .then(result => {
        res.send('修改成功！')
      })
      .catch(err => res.status(400).send('修改失败，请重试！'))
  }
)

// $route POST api/category/edit
// @desc 删除分类信息
// @access private
router.post(
  '/del',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Category.findOneAndRemove({ _id: req.body._id }, { new: true })
      .then(result => {
        res.send('删除成功！')
      })
      .catch(err => res.status(400).send('删除失败，请重试！'))
  }
)

// $route GET api/category/all
// @desc 获取所有分类信息
// @access public
router.get('/all', (req, res) => {
  Category.find()
    .then(result => {
      if (!result) {
        return res.json({})
      }
      res.json(result)
    })
    .catch(err => {
      console.log(err)
    })
})

module.exports = router
