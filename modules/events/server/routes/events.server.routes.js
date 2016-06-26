'use strict';

//var sponsorshipPolicy = require('../policies/sponsorships.server.policy'),
//  sponsorship = require('../controllers/sponsorships.server.controller');

var events = require('../controllers/events.server.controller');
//If a certain url is called it will execute the following function.  .get(Function Name) can be
//found in sponsorships.server.controller.js
module.exports = function(app){
  app.route('/api/events')
  .get(events.listAll)
  .post(events.create);

  app.route('/api/events/:eventID')
  .get(events.listOne)
  .put(events.update)
  .delete(events.delete);

  app.param('eventID',events.eventByID);
};
