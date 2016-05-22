'use strict';

// Setting up route
angular.module('announcements').config(['$stateProvider',
  function ($stateProvider) {
    // Users state routing
    $stateProvider
      .state('announcements', {
        abstract: true,
        url: '/announcements',
        template: '<ui-view/>'

      })
      //.state('announcements.announce', {
      //  url: '',
      //  templateUrl: 'modules/announcements/client/views/announce.client.view.html'
      //})
      .state('announcements.list', {
        url: '',
        templateUrl: 'modules/announcements/client/views/announcements.list.client.view.html'

      })
      .state('announcements.create', {
        url: '/create',
        templateUrl: 'modules/announcements/client/views/announcement.create.client.view.html'

      })
      .state('announcements.listOne', {
        url: '/:announcementID',
        templateUrl: 'modules/announcements/client/views/announcement.list.client.view.html'

      })
      .state('announcements.update', {
        url: '/update/:announcementID',
        templateUrl: 'modules/announcements/client/views/announcement.update.client.view.html'

      });
  }
]);
/////////
//.state('children', {
//        abstract: true,
//        url: '/children',
//        template: '<ui-view/>'
//      })
