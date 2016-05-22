'use strict';
//NOTE:Methods used to do HTTP requests.  To use an HTTP request listed here just call the method
angular.module('announcements').factory('Announcements', ['$http',
  function($http) {
    var methods = {

      read: function(id) {
        return $http.get('/api/announcements/' + id);
      },
      deleteAnnouncement: function(id) {
        return $http.delete('/api/announcements/' + id);
      },
      updateAnnouncement: function(id, announcement) {
        return $http.put('/api/announcements/' + id, announcement);
      },

    };
    return methods;
  }]);
