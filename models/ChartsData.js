const mongoose = require('mongoose')
const schema = mongoose.Schema

const ChartsSchema = new schema({
  date: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    required: true,
    default: 0
  },
  income: {
    type: Number,
    required: true,
    default: 0
  }
})

module.exports = ChartsData = mongoose.model('chartsdata', ChartsSchema)
