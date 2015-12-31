angular.module('domopi')

.controller('AccountCtrl', function($scope, $ionicPopup, $stateParams, Account) {
  $scope.message = 'SorryZZZ but we can not contact the web service.'
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
    var title = 'Web service check';
    var data;
    Account.ping(url).success( function(response) {
      console.log(response);
      data = response;
      $scope.message = (data.status == 'ok') ? 'Ok the web service url was successfully checked. Version : ' + data.doVersion : 'Sorry but we can not contact the web service.'

    });
    $scope.showAlert(title, $scope.message);

  };

});


