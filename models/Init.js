const mongoose = require('mongoose')
const Schema = mongoose.Schema

const InitSchema = new Schema({
  admin: {
    type: Boolean,
    required: true
  },
  shop: {
    type: Boolean,
    required: true
  }
})

module.exports = Init = mongoose.model('init', InitSchema)
