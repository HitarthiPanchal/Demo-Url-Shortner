const mongoose = require('mongoose')
const shortId = require('shortid')

const UrlShortSchema = new mongoose.Schema({
  full: {
    type: String,
    required: true,
    validate: {
      validator: function(value) {
        const urlPattern = /(http|https):\/\/(\w+:{0,1}\w*#)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%#!\-/]))?/;
        const urlRegExp = new RegExp(urlPattern);
        return value.match(urlRegExp);
      },
      message: props => `${props.value} is not a valid URL`
    }
  },
  short: {
    type: String,
    required: true,
    default: shortId.generate
  }
})

module.exports = mongoose.model('UrlShort', UrlShortSchema)