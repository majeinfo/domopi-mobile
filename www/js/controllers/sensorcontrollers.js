angular.module('starter')

.controller('SensorsCtrl', function($scope, Sensors) {
  $scope.sensors = Sensors.all();
  console.log($scope.sensors);
  $scope.$on('$ionicView.enter', function(e) {
    console.log('updated');
    $scope.sensors = Sensors.update();
  });


  $scope.sendcmd = function(sensor, cmd) {
    console.log(cmd);
    Sensors.cmd(sensor.devid, sensor.instid, sensor.sid, cmd);
  };

  $scope.remove = function(sensor) {
    Sensors.remove(sensor);
  };
})
.controller('SensorDetailCtrl', function($scope, $stateParams, Sensors) {
  $scope.sensor = Sensors.get($stateParams.devid, $stateParams.instid, $stateParams.sid);
});
