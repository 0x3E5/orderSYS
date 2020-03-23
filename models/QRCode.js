const mongoose = require('mongoose')
const Schema = mongoose.Schema

const QRCodeSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  no: {
    type: Number,
    required: true
  }
})

module.exports = QRCode = mongoose.model('qrcode', QRCodeSchema)
