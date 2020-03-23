const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
  cName: {
    type: String,
    required: true
  },
  no: {
    type: Number,
    required: true
  }
})

module.exports = Category = mongoose.model('category', CategorySchema)
