angular.module('domopi')

.controller('SensorsCtrl', function($scope, $ionicModal, Sensors) {
  $scope.spinneroff = true;

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
  $ionicModal.fromTemplateUrl('templates/sensorforms/modalform.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then( function(modal){
    $scope.modal = modal;
  });
  $scope.openmodal = function() {
    $scope.modal.show();
  };
  $scope.closemodal = function() {
    $scope.modal.hide();
  };
  //destroy modal
  $scope.$on('$destroy', function(){
    $scope.modal.remove();
  });
  //Execute code on modal hide
  $scope.$on('modal.hidden', function(){
    //code on modal hide
  });
  //Execute code on modal remove
  $scope.$on('modal.removed', function(){
    //code on modal remove
  });
  $scope.exclusion = function(event, cmd) {
    event.preventDefault();
    Sensors.sensorexclusion().success( function(response){
        //$scope.spinneroff = false;
        console.log('sensorexclusion callback');
        console.log(response)
    });    

  };
  $scope.discover = function(event, cmd) {
    event.preventDefault();
    if (cmd == 'start'){
      Sensors.discoveron().success( function(response){
        $scope.spinneroff = false;
        console.log('disconveron callback');
        console.log(response)
      });    
    }
    if (cmd == 'stop'){
      Sensors.discoveroff().success( function(response){
        $scope.spinneroff = true;
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

})
.controller('SensorDetailCtrl', function($scope, $stateParams, Sensors) {
  $scope.sensor = Sensors.get($stateParams.devid, $stateParams.instid, $stateParams.sid);
})
.controller('sensorformController', function($scope, $stateParams, Sensors) {
  $scope.sensor = Sensors.get($stateParams.devid, $stateParams.instid, $stateParams.sid);
});

