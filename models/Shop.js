const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ShopSchema = new Schema({
  shopName: {
    type: String,
    required: true
  },
  shopIntro: {
    type: String,
    required: true
  },
  shopNotice: {
    type: String,
    required: true
  },
  shopImg: {
    type: String
  }
})

module.exports = Shop = mongoose.model('shop', ShopSchema)
