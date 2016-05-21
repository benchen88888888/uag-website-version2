'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


var AnnouncementSchema = new Schema({
  datePosted: Date,
  message: String,
  title: String
  //Should we have an event attribute here as well?

});

mongoose.model('Announcements', AnnouncementSchema);
