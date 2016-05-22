'use strict';

var mongoose = require('mongoose'),
  Announcements = mongoose.model('Announcements'),
  Users = mongoose.model('User'),
  _ = require('lodash');


exports.create = function (req, res) {
    //create a new announcement
  var announcement = new Announcements(req.body);


  announcement.save(function(err) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(announcement);
    }
  });
};

exports.listAll = function(req,res){
  Announcements.find().exec(function(err,Announcements){
    if(err){
      return res.status(400).send(err);
    } else{
      res.json(Announcements);
    }
  });
};

exports.listOne = function(req,res){
  var announcement = req.announcement;
  res.json(announcement);
};

exports.announcementByID = function(req,res,next,id){
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).send({
      message:'AnnouncmentID is invalid'
    });
  }
  Announcements.findById(id).populate('user','displayName').exec(function(err,announcement){
    if(err){
      return next(err);
    } else if(!announcement){
      return res.status(404).send({
        message:'No announcement with that id was found'
      });
    }
    req.announcement = announcement;
    next();
  });
};

exports.update = function(req,res){
  var annoucement = req.announcement;

  annoucement.title = req.body.title;
  annoucement.message = req.body.message;


  annoucement.save(function(err){
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    else{
      res.json(annoucement);
    }
  });
};

exports.delete = function (req, res) {
  var announcement = req.announcement;

  announcement.remove(function(err) {
    if(err){
      res.status(400).send(err);
    }
    else {
      res.end();
    }
  });
};
