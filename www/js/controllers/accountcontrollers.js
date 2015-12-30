angular.module('starter')

.controller('AccountCtrl', function($scope, $ionicPopup, $stateParams, Account) {
  $scope.showAlert = function(title, message) {
     var alertPopup = $ionicPopup.alert({
       title: title,
       template: message
     });

     alertPopup.then(function(res) {
       console.log('closing popup');
     });
   };
  $scope.settings = {
    enableFriends: true,
    rpiwsurl: 'http://localhost:3000'
  };
  $scope.check = function(url) {
    var message = '', title = 'Web service check';

    status = Account.ping(url);
    message = (status == 'ok') ? 'Ok the web service url was successfully checked.' : 'Sorry but we can not contact the web service.'
    $scope.showAlert(title, message);
  };

});


