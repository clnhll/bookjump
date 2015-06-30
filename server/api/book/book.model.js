'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BookSchema = new Schema({
  title: String,
  owner: String,
  cover: String,
  requested: {
    type: Boolean,
    default: false
    },
  active: Boolean
});

module.exports = mongoose.model('Book', BookSchema);
