angular.module('starter.services', [])

.factory('Sensors', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var sensors = [];

  return {
    all: function() {
      $http.get("http://localhost:3000/sensors/list", { params: { "key1": "value1", "key2": "value2" } })
        .success(function(data) {
            sensors = data;
            //$scope.lastname = data.lastname;
        })
        .error(function(data) {
            alert("ERROR");
        });
      return sensors;
    },
    remove: function(sensor) {
      sensors.splice(sensors.indexOf(sensor), 1);
    },
    get: function(sensorId) {
      for (var i = 0; i < sensors.length; i++) {
        if (sensors[i].id === parseInt(chatId)) {
          return sensors[i];
        }
      }
      return null;
    }
  };
});
