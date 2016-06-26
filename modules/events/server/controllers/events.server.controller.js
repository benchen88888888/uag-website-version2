'use strict';

var mongoose = require('mongoose'),
  Events = mongoose.model('Events'),
  Users = mongoose.model('User'),
  _ = require('lodash');


exports.create = function (req, res) {
    //create a new event
  var events = new Events(req.body);


  events.save(function(err) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(events);
    }
  });
};

exports.listAll = function(req,res){
  Events.find().exec(function(err,Events){
    if(err){
      return res.status(400).send(err);
    } else{
      res.json(Events);
    }
  });
};

exports.listOne = function(req,res){
  var events = req.events;
  res.json(events);
};

exports.eventByID = function(req,res,next,id){
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).send({
      message:'EventID is invalid'
    });
  }
  Events.findById(id).populate('user','displayName').exec(function(err,events){
    if(err){
      return next(err);
    } else if(!events){
      return res.status(404).send({
        message:'No event with that id was found'
      });
    }
    req.events = events;
    next();
  });
};

exports.update = function(req,res){
  var events = req.events;

  events.title = req.body.title;
  events.dateTime = req.body.dateTime
  events.location = req.body.location
  events.description = req.body.description
  events.facebookEventLink = req.body.facebookEventLink

  events.save(function(err){
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
    else{
      res.json(events);
    }
  });
};

exports.delete = function (req, res) {
  var events = req.events;

  events.remove(function(err) {
    if(err){
      res.status(400).send(err);
    }
    else {
      res.end();
    }
  });
};
