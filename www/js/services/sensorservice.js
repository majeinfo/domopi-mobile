angular.module('starter')

.service('Sensors', function($http) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var rpiws_endpoint = "http://localhost:3000";
  var sensors = [];
  var sample_data =
  {"status":"ok","data":[{"devid":"3","instid":"0","sid":"0","deviceType":"buttonControl","metrics":{"icon":"","title":"Button Chromatic Technologies 0-0","level":"off","change":""},"is_level_number":false,"level":0,"on_off":false,"change":""},{"devid":"2","instid":"0","sid":"48-8","deviceType":"sensorBinary","metrics":{"probeTitle":"Tamper","scaleTitle":"","icon":"motion","level":"off","title":"Sensor Tamper 2-0-48-8"},"is_level_number":false,"level":0,"on_off":false},{"devid":"2","instid":"0","sid":"48-10","deviceType":"sensorBinary","metrics":{"probeTitle":"Door/Window","scaleTitle":"","icon":"door","level":"off","title":"Sensor Door/Window 2-0-48-10"},"is_level_number":false,"level":0,"on_off":false},{"devid":"2","instid":"0","sid":"49-1","deviceType":"sensorMultilevel","metrics":{"probeTitle":"Temperature","scaleTitle":"..C","level":-40,"icon":"temperature","title":"Sensor Temperature 2-0-49-1"},"is_level_number":true,"level":-40,"on_off":false},{"devid":"2","instid":"0","sid":"49-3","deviceType":"sensorMultilevel","metrics":{"probeTitle":"Luminiscence","scaleTitle":"%","level":0,"icon":"luminosity","title":"Sensor Luminiscence 2-0-49-3"},"is_level_number":true,"level":0,"on_off":false},{"devid":"2","instid":"0","sid":"113-6-Door-A","deviceType":"sensorBinary","metrics":{"icon":"door","level":"on","title":"Alarm Access Control 2-0-113-6-Door"},"is_level_number":false,"level":0,"on_off":true},{"devid":"2","instid":"0","sid":"128","deviceType":"battery","metrics":{"probeTitle":"Battery","scaleTitle":"%","level":0,"icon":"battery","title":"Battery 2-0"},"is_level_number":true,"level":0,"on_off":false}]};
  this.all = function() {
    console.log('getting sensors infos');
    data = $http.get(rpiws_endpoint + "/sensors/list")
      .success(function(data) {
        console.log('ok');
        if (data.status == 'ok') {
          sensors = data.data;
          console.log(sensors);
        }

      })
      .error(function(data) {
          console.log('error');
          sensors = sample_data.data;
          console.log(sensors);

          return sensors;
      });
      // ajouter test data.status == 'ok'
    console.log(data);
    if (data.status == 'ok') {
      sensors = data.data;
    }
    
    console.log(sensors);
    return sensors;
    };

    this.update = function() {
      return sensors;
    };

    this.remove = function(sensor) {
      sensors.splice(sensors.indexOf(sensor), 1);
    };

    this.get = function(devid, instid, sid) {
      for (var i = 0; i < sensors.length; i++) {
        if (sensors[i].devid === (devid) && sensors[i].instid === (instid) && sensors[i].sid === (sid)) {
          return sensors[i];
        }
      }
      return null;
    };

    this.cmd = function(devid, instid, sid, cmd) {
      command = $http.get(rpiws_endpoint + "/sensors/command", { params:
        {
          "devid": devid,
          "instid": instid,
          "sid": sid,
          "command": cmd
        } })
      .error(function(data) {
          console.log('error');
          sensors = sample_data.data;
          console.log(sensors);
      });
      for (var i = 0; i < sensors.length; i++) {
        if (sensors[i].devid === (devid) && sensors[i].instid === (instid) && sensors[i].sid === (sid)) {
          sensors[i].metrics.level = cmd;
          //console.log(sensors[i]);
        }
      }
      return null;

    };

});
