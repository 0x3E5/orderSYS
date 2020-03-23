const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema({
  orderNo: {
    type: String,
    required: true
  },
  deskNo: {
    type: Number,
    required: true
  },
  order: {
    type: Array,
    required: true
  },
  remark: {
    type: String
  },
  totalPrice: {
    type: Number,
    required: true
  },
  state: {
    type: Number,
    required: true,
    default: 0
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  }
})

module.exports = Order = mongoose.model('order', OrderSchema)
