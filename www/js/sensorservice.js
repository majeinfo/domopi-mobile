angular.module('starter')

.service('Sensors', function($http) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var sensors = [];

  this.all = function() {
      $http.get("http://localhost:3000/sensors/list", { params: { "key1": "value1", "key2": "value2" } })
        .success(function(data) {
            this.sensors = data;
            console.log('error');

            //$scope.lastname = data.lastname;
        })
        .error(function(data) {
            console.log('error');
            alert("ERROR");
        });
      return this.sensors;
    };

    this.remove = function(sensor) {
      sensors.splice(sensors.indexOf(sensor), 1);
    };

    this.get = function(sensorId) {
      for (var i = 0; i < sensors.length; i++) {
        if (sensors[i].id === parseInt(chatId)) {
          return sensors[i];
        }
      }
      return null;
    };

});
