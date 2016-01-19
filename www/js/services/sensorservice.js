angular.module('domopi')

.service('Sensors', function($http, Account) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var sample = {"status":"ok","data":[{"devid":"3","instid":"0","sid":"0","deviceType":"buttonControl","metrics":{"icon":"","title":"Button Chromatic Technologies 0-0","level":"on","change":""},"is_level_number":false,"level":0,"on_off":true,"change":""},{"devid":"2","instid":"0","sid":"37","deviceType":"switchBinary","metrics":{"icon":"switch","title":"Switch 2-0 Everspring","level":"off"},"is_level_number":false,"level":0,"on_off":false},{"devid":"2","instid":"0","sid":"49-1","deviceType":"sensorMultilevel","metrics":{"probeTitle":"Temperature","scaleTitle":"°C","level":-40,"icon":"temperature","title":"Sensor Temperature 2-0-49-1"},"is_level_number":true,"level":-40,"on_off":false}]};
  var sensors = [];
  var settings = Account.getsettings();
  this.all = function() {
    console.log('getting sensors infos from: ' + settings.rpiwsurl);
    var data = $http.get(settings.rpiwsurl + "/sensors/list")
      .error(function(data) {
          console.log('error getting sensors list');
          sensors = sample.data;
          console.log(sensors);
      });
      // ajouter test data.status == 'ok'
    return data;
    };

    this.set = function(data) {
      sensors = data;
    };

    this.update = function() {
      return sensors;
    };

    this.remove = function(sensor) {
      sensors.splice(sensors.indexOf(sensor), 1);
    };
    this.getall = function() {
      return sensors;
    }
    this.get = function(devid, instid, sid) {
      for (var i = 0; i < sensors.length; i++) {
        if (sensors[i].devid === (devid) && sensors[i].instid === (instid) && sensors[i].sid === (sid)) {
          return sensors[i];
        }
      }
      return null;
    };

    this.cmd = function(devid, instid, sid, cmd) {
      command = $http.get(settings.rpiwsurl + "/sensors/command/" + devid + '/' + instid + '/' + sid + '/' + cmd)
      .error(function(data) {
          console.log('error while sending command');
      });
      for (var i = 0; i < sensors.length; i++) {
        if (sensors[i].devid === (devid) && sensors[i].instid === (instid) && sensors[i].sid === (sid)) {
          sensors[i].metrics.level = cmd;
          //console.log(sensors[i]);
        }
      }
      return command;

    };
    this.discoveron = function() {
      var cmd = 'start'
      var data = $http.get(settings.rpiwsurl + "/controllers/discovery/" + cmd)
        .error(function() {
            console.log('error setting discovery on ');
        });
        // ajouter test data.status == 'ok'
      return data;

    };
    this.discoveroff = function() {
      var cmd = 'stop'
      var data = $http.get(settings.rpiwsurl + "/controllers/discovery/" + cmd)
        .error(function() {
            console.log('error setting discovery off');
        });
        // ajouter test data.status == 'ok'
      return data;

    };
    this.getnew = function(){
      var cmd = 'getnew'
      var data = $http.get(settings.rpiwsurl + "/controllers/discovery/" + cmd)
        .error(function() {
            console.log('error setting discovery getnew');
        });
        // ajouter test data.status == 'ok'
      return data;

    };

});
