'use strict';

angular.module('events').controller('EventController', ['$scope','$http','$stateParams','$state','Authentication','Events',
  function($scope,$http, $stateParams,$state,Authentication,Events){



    //used to create a sponsorship called from the createsponsorship.client.view.html
    $scope.createEvent = function(isValid) {
      $scope.error = null;
      if(!isValid){
        console.log('Do I go here?');
        $scope.broadcast('show-errors-check-validity','articleForm');
        return false;
      }
      // var beginDate = new Date();//Switch this to date that you get from form.
      // $scope.events.datePosted = beginDate;//Adds beginDate as datePosted
      var id = Authentication.user._id;
      //post to the sponsorship API
      $http.post('/api/events', $scope.events)
      //Announcements.createAnnouncement($scope.announcement)//TODO:Make this line work currently undef
              .then(function(response) {
                $state.go('events.list', { successMessage: 'Event successfully created!' });
                console.log('STATE GO GO GO!');
              }, function(error) {
                //otherwise display the error
                $scope.error = 'Unable to POST Event!\n' + error;
              });

    };
    //Overload this function to sort
    $scope.findAllEvents = function(){
      console.log('Really really');
      //$http.get('/api/announcements', $scope.announcement)
      Events.getAllEvents($scope.events)
              .then(function(response) {
                $scope.events = response.data;
                //$scope.reverseOrder($scope.announcements);
                //if the object is successfully saved redirect back to the list page
                //$state.go('sponsorship.list', { successMessage: 'Sponsorship succesfully created!' });
              }, function(error) {
                //otherwise display the error
                $scope.error = 'Unable to save findAllEvents!\n' + error;
              });

    };
    $scope.reverseOrder = function(rawevents){
      var temp = [];
      var length = rawevents.length;
      for(var i = 0;i<length;i++){
        temp[i] = rawevents[length - i - 1];
      }
      $scope.events=temp;
    };

    $scope.updateEvent = function(isValid){
      $scope.error=null;
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'eventForm');
        return false;
      }
      Events.updateEvent($stateParams.eventID, $scope.events)
        .then(function(response) {
          $state.go('events.list', { successMessage: 'Event succesfully updated!' });
        }, function(error) {
          $scope.error = 'Unable to update event!\n' + error;
        });
    };
    $scope.findOneEvent = function(){
      var id = $stateParams.eventID;
      console.log(id);
      Events.getOneEvent(id)
              .then(function(response) {
                $scope.events = response.data;
                console.log('Find one shows');
                console.log($scope.events);
                console.log($stateParams);
              }, function(error) {
                $scope.error = 'Unable to get event with id "' + id + '"\n' + error;
              });
    };
    $scope.deleteEvent = function() {
      $scope.error = null;
      console.log('Do I go here?');
      var id = $stateParams.eventID;
      console.log(id);
      Events.deleteEvent(id).then(function(response) {
        $state.go('events.list', { successMessage: 'Event successfully removed!' });
      }, function(error) {
        $scope.error = 'Unable to delete the event!\n' + error;
      });
    };

    $scope.isAdmin = function() {
      $scope.roles=Authentication.user.roles;
      if(Authentication.user) {
        var indexOfRole = $scope.roles.indexOf('admin');
        if (indexOfRole !== -1) {
          return true;
        }
        else{
          return false;
        }
      }
      else{
        return false;
      }
    };

  }
]);
