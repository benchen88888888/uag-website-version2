'use strict';
//NOTE:Methods used to do HTTP requests.  To use an HTTP request listed here just call the method
angular.module('events').factory('Events', ['$http',
  function($http) {

    var methods = {
      getAllEvents: function(events) {
        return $http.get('/api/events', events);
      },
      getOneEvent: function(id) {
        return $http.get('/api/events/' + id);
      },
      createEvent: function(events) {
        $http.post('/api/events', events);
      },
      deleteEvent: function(id) {
        return $http.delete('/api/events/' + id);
      },
      updateEvent: function(id, events) {
        return $http.put('/api/events/' + id, events);
      },

    };
    return methods;
  }]);
