'use strict';

angular.module('announcements').controller('AnnouncementController', ['$scope','$http','$stateParams','$state','Authentication',
  function($scope,$http, $stateParams,$state,Authentication){



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

    $scope.findAnnouncement = function(){
      console.log('Really really');
      var id = $stateParams.announcementID;
      $http.get('/api/announcements/' + id, $scope.announcement)
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

  }
]);
