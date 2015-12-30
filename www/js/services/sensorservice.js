angular.module('starter')

.service('Sensors', function($http, Account) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var sensors = [];
  var settings = Account.getsettings();
  this.all = function() {
    console.log('getting sensors infos from: ' + settings.rpiwsurl);
    var data = $http.get(settings.rpiwsurl + "/sensors/list")
      .error(function() {
          console.log('error');
      });
      // ajouter test data.status == 'ok'
    return data;
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
      command = $http.get(settings.rpiwsurl + "/sensors/command/" + devid + '/' + instid + '/' + sid + '/' + cmd)
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
