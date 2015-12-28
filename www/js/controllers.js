angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})
.controller('SensorsCtrl', function($scope, Sensors) {
  $scope.sensors = Sensors.all();
  console.log($scope.sensors);

  $scope.remove = function(sensor) {
    Sensors.remove(sensor);
  };
})
.controller('SensorDetailCtrl', function($scope, $stateParams, Sensors) {
  $scope.sensor = Sensors.get($stateParams.devid);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});

