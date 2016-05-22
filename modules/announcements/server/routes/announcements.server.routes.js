'use strict';

//var sponsorshipPolicy = require('../policies/sponsorships.server.policy'),
//  sponsorship = require('../controllers/sponsorships.server.controller');

var announcement = require('../controllers/announcements.server.controller');
//If a certain url is called it will execute the following function.  .get(Function Name) can be
//found in sponsorships.server.controller.js
module.exports = function(app){
  app.route('/api/announcements')
  .get(announcement.listAll)
  .post(announcement.create);

  app.route('/api/announcements/:announcementID')
  .get(announcement.listOne)
  .put(announcement.update)
  .delete(announcement.delete);
  
  app.param('announcementID',announcement.announcementByID);
};
