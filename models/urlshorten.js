const mongoose = require('mongoose')
const Schema = mongoose.Schema

const shortenSchema = new Schema({
  url_origin: {
    type: String,
    required: true
  },
  url_shorten: {
    type: String
  }
})

module.exports = mongoose.model('Urlshorten', shortenSchema)