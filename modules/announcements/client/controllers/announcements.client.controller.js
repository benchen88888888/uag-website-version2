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
              .then(function(response) {
                //if the object is successfully saved redirect back to the list page
                //$state.go('sponsorship.list', { successMessage: 'Sponsorship succesfully created!' });
                console.log('Sucess!');
              }, function(error) {
                //otherwise display the error
                $scope.error = 'Unable to POST Announcment!\n' + error;
              });

              /////////////////////////////////////////////////////////////////

    /*  Children.updateFunding($stateParams.childrenId,$scope.sponsorshipType)//there is an error here idk what it is
        .then(function(response) {
          $http.post('/api/'+id+'/sponsor/sponsorships', $scope.sponsorship)
                  .then(function(response) {
                    //if the object is successfully saved redirect back to the list page
                    $state.go('sponsorship.list', { successMessage: 'Sponsorship succesfully created!' });
                  }, function(error) {
                    //otherwise display the error
                    $scope.error = 'Unable to save sponsorship!\n' + error;
                  });
        }, function(error) {
          //otherwise display the error
          $scope.error = 'Unable to sponsor child!\n' + error;
        });*/
    };

    $scope.findAllAnnouncements = function(){
      console.log('Really really');
      $http.get('/api/announcements', $scope.announcement)
              .then(function(response) {
                $scope.announcements = response.data;
                //if the object is successfully saved redirect back to the list page
                //$state.go('sponsorship.list', { successMessage: 'Sponsorship succesfully created!' });
                console.log('Sucesss!');
                console.log($scope.announcements[0]);
              }, function(error) {
                //otherwise display the error
                $scope.error = 'Unable to save findAllAnnouncements!\n' + error;
              });
    };
    $scope.updateAnnouncement = function(isValid){
      $scope.error=null;
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'announcementForm');
        return false;
      }
      console.log('Fail!');
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
      Announcements.read(id)
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
  }
]);
