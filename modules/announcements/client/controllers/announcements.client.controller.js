'use strict';

angular.module('announcements').controller('AnnouncementController', ['$scope','$http','$stateParams','$state','Authentication','Announcements',
  function($scope,$http, $stateParams,$state,Authentication,Announcements){



    //used to create a sponsorship called from the createsponsorship.client.view.html
    $scope.createAnnouncement = function(isValid) {
      $scope.error = null;
      if(!isValid){
        $scope.broadcast('show-errors-check-validity','articleForm');
        return false;
      }
      var beginDate = new Date();
      $scope.announcement.datePosted = beginDate;//Adds beginDate as datePosted

      var id = Authentication.user._id;

      //post to the sponsorship API
      $http.post('/api/announcements', $scope.announcement)
      //Announcements.createAnnouncement($scope.announcement)//TODO:Make this line work currently undef
              .then(function(response) {
                $state.go('announcements.list', { successMessage: 'Announcement successfully created!' });
                console.log('STATE GO GO GO!');
              }, function(error) {
                //otherwise display the error
                $scope.error = 'Unable to POST Announcment!\n' + error;
              });

    };
    //Overload this function to sort
    $scope.findAllAnnouncements = function(){
      console.log('Really really');
      //$http.get('/api/announcements', $scope.announcement)
      Announcements.getAllAnnouncements($scope.announcement)
              .then(function(response) {
                $scope.announcements = response.data;
                $scope.reverseOrder($scope.announcements);
                //if the object is successfully saved redirect back to the list page
                //$state.go('sponsorship.list', { successMessage: 'Sponsorship succesfully created!' });
              }, function(error) {
                //otherwise display the error
                $scope.error = 'Unable to save findAllAnnouncements!\n' + error;
              });

    };
    $scope.reverseOrder = function(rawAnnouncements){
      var temp = [];
      var length = rawAnnouncements.length;
      for(var i = 0;i<length;i++){
        temp[i] = rawAnnouncements[length - i - 1];
      }
      $scope.announcements=temp;
    };

    $scope.updateAnnouncement = function(isValid){
      $scope.error=null;
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'announcementForm');
        return false;
      }
      Announcements.updateAnnouncement($stateParams.announcementID, $scope.announcement)
        .then(function(response) {
          $state.go('announcements.list', { successMessage: 'Announcement succesfully updated!' });
        }, function(error) {
          $scope.error = 'Unable to update announcement!\n' + error;
        });
    };
    $scope.findOneAnnouncement = function(){
      var id = $stateParams.announcementID;
      console.log(id);
      Announcements.getOneAnnouncement(id)
              .then(function(response) {
                $scope.announcement = response.data;
                console.log('Find one shows');
                console.log($scope.announcement);
                console.log($stateParams);
              }, function(error) {
                $scope.error = 'Unable to get announcement with id "' + id + '"\n' + error;
              });
    };
    $scope.deleteAnnouncement = function() {
      $scope.error = null;
      console.log('Do I go here?');
      var id = $stateParams.announcementID;
      console.log(id);
      Announcements.deleteAnnouncement(id).then(function(response) {
        $state.go('announcements.list', { successMessage: 'Announcement successfully removed!' });
      }, function(error) {
        $scope.error = 'Unable to delete the announcement!\n' + error;
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
