'use strict';

// Setting up route
angular.module('events').config(['$stateProvider',
  function ($stateProvider) {
    // Users state routing
    $stateProvider
      .state('events', {
        abstract: true,
        url: '/events',
        template: '<ui-view/>'

      })
      //.state('announcements.announce', {
      //  url: '',
      //  templateUrl: 'modules/announcements/client/views/announce.client.view.html'
      //})
      .state('events.list', {
        url: '',
        templateUrl: 'modules/events/client/views/events.list.client.view.html'
      })
      .state('events.create', {
        url: '/create',
        templateUrl: 'modules/events/client/views/event.create.client.view.html',
        data: {
          roles: ['admin']
        }
      })
      .state('events.listOne', {
        url: '/:eventID',
        templateUrl: 'modules/events/client/views/event.list.client.view.html'

      })
      .state('events.update', {
        url: '/update/:eventID',
        templateUrl: 'modules/events/client/views/event.update.client.view.html',
        data: {
          roles: ['admin']
        }

      });
  }
]);
