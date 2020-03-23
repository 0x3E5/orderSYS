const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommoditySchema = new Schema({
  img: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  describe: {
    type: String
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  isDiscount: {
    type: Boolean,
    required: true
  },
  onSale: {
    type: Number,
    default: 0
  },
  soldOut: {
    type: Boolean,
    required: true
  }
})

module.exports = Commodity = mongoose.model('commodity', CommoditySchema)
