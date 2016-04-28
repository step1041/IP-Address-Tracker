'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:PostCtrl
 * @description
 * # PostCtrl
 * Controller of the appApp
 */
angular.module('appApp')
  .controller('HomeCtrl', function ($http, $scope, API_ENDPOINT, $state, $uibModal, $log, dataService, dataFactory) {


    //get the data




    dataFactory.getAll()
      .success(function (response) {
        var address = response;
        $scope.ipaddressData = address;
      })
      .error(function (response, status) {
        switch (status) {
          case 404:
            console.log("404, can't get all data")
            break;
          default:
            console.log("General Error")
            break;
        }
      });
    //   console.log($scope.ipaddressData);


    //   $http({
    //     method: 'GET',
    //     url: 'http://localhost:1337/ipaddress'
    //   }).then(function successCallback(response) {
    //     // this callback will be called asynchronously
    //     // when the response is available
    //     $scope.ipaddressData = response.data;
    //     return $scope.ipaddressData;
    //   }, function errorCallback(response) {
    //     // called asynchronously if an error occurs
    //     // or server returns response with an error status.
    //     $scope.ipaddressData = "failed";
    //     return "failed";
    //   });
    //  // post new data

    //   $http({
    //     method: 'POST',
    //     url: 'http://localhost:1337/ipAddress',
    //     data: $scope.address
    //   }).then(function successCallback(response) {
    //     // this callback will be called asynchronously
    //     // when the response is available
    //     $scope.ipaddressData = response.data;
    //     console.log(response.data);
    //   }, function errorCallback(response) {
    //     // called asynchronously if an error occurs
    //     // or server returns response with an error status.
    //     $scope.ipaddressData = response.data;
    //     console.log(response.data);
    //   });


    //   //put update current data from current id

    //   $http({
    //     method: 'PUT',
    //     url: 'http://localhost:1337/ipAddress',
    //     data: $scope.address
    //   }).then(function successCallback(response) {
    //     // this callback will be called asynchronously
    //     // when the response is available
    //     $scope.ipaddressData = response.data;
    //   }, function errorCallback(response) {
    //     // called asynchronously if an error occurs
    //     // or server returns response with an error status.
    //     $scope.ipaddressData = response.data;
    //     console.log(response.data);
    //   });

    //   //delete data from ID
    //   $scope.deleteAddress = function (id) {

    //     $http({
    //       method: 'DELETE',
    //       url: 'http://localhost:1337/ipAddress/' + id,
    //       data: $scope.address
    //     }).then(function successCallback(response) {
    //       // this callback will be called asynchronously
    //       // when the response is available
    //       $scope.ipaddressData = response.data;
    //       getData();
    //     }, function errorCallback(response) {
    //       // called asynchronously if an error occurs
    //       // or server returns response with an error status.
    //       $scope.ipaddressData = response.data;
    //       console.log(response.data);
    //     });

    //   };

    //$scope.items = $scope.getData();

    $scope.open = function (id) {
      $scope.editAddress = null;
      dataFactory.get(id)
        .success(function (response) {
          $scope.editAddress = response;
          console.log($scope.editAddress);

          var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContent.html',
            controller: 'EditModalInstanceCtrl',
            resolve: {
              addressData: function () {
                console.log(id);
                console.log($scope.editAddress);
                return $scope.editAddress;
              }
            }
          });




        })
        .error(function (response, status) {
          switch (status) {
            case 404:
              console.log("404, can't get all data")
              break;
            default:
              console.log("General Error")
              break;
          }
        });


      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

  });
