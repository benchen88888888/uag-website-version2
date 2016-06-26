'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


var EventSchema = new Schema({
  title: String,
  dateTime: Date,
  location: String,
  description: String,
  facebookEventLink: String
//pinned

});

mongoose.model('Events', EventSchema);
