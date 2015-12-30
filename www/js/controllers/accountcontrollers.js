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
  $scope.settings = Account.getsettings();
  $scope.check = function(url) {
    var message = 'Sorry but we can not contact the web service.', title = 'Web service check';
    var data;
    Account.ping(url).success( function(response) {
      console.log(response);
      data = response;
      message = (data.status == 'ok') ? 'Ok the web service url was successfully checked.' : 'Sorry but we can not contact the web service.'

    });
    $scope.showAlert(title, message);

  };

});


