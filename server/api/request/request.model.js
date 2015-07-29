'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RequestSchema = new Schema({
  book: String,
  bookid: String,
  ownerid: String,
  requesterid: String,
  approved: {
    type: Boolean,
    default: false },
  active: Boolean
});

module.exports = mongoose.model('Request', RequestSchema);
