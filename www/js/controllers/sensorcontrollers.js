angular.module('domopi')

.controller('SensorsCtrl', function($scope, Sensors) {
  console.log($scope.sensors);
  Sensors.all().success( function(response){
    console.log('callback sensor');
    if (response.status == 'ok'){
      $scope.sensors = response.data;
      Sensors.set(response.data);
    }
  });
  //utile avec les données de test sinon le $scope.sensors n'est pas mis à jour
  $scope.$on('$ionicView.enter', function(e) {
    console.log('updated');
    $scope.sensors = Sensors.update();
  });


  $scope.sendcmd = function(sensor, cmd) {
    console.log(cmd);
    Sensors.cmd(sensor.devid, sensor.instid, sensor.sid, cmd).success( function(response){
      console.log('command successfully executed');
    });
  };

  $scope.remove = function(sensor) {
    Sensors.remove(sensor);
  };
})
.controller('SensorDetailCtrl', function($scope, $stateParams, Sensors) {
  $scope.sensor = Sensors.get($stateParams.devid, $stateParams.instid, $stateParams.sid);
})
.controller('sensorformController', function($scope, $stateParams, Sensors) {
  $scope.sensor = Sensors.get($stateParams.devid, $stateParams.instid, $stateParams.sid);
  $scope.discover = function(event, cmd) {
    event.preventDefault();
    if (cmd == 'start'){
      Sensors.discoveron().success( function(response){
        console.log('disconveron callback');
        console.log(response)
      });    
    }
    if (cmd == 'stop'){
      Sensors.discoveroff().success( function(response){
        console.log('disconveroff callback');
        console.log(response)
      });      
    }
    if (cmd == 'getnew'){
      Sensors.getnew().success( function(response){
        console.log('getnew callback');
        console.log(response)
      });      
    }

  }
});

