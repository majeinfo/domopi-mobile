angular.module('starter')

.service('Rules', function($http, $stateParams, Account) {
  var sample = {"status":"ok","data":[{"devid":"3","instid":"0","sid":"0","deviceType":"buttonControl","metrics":{"icon":"","title":"Button Chromatic Technologies 0-0","level":"on","change":""},"is_level_number":false,"level":0,"on_off":true,"change":""},{"devid":"2","instid":"0","sid":"37","deviceType":"switchBinary","metrics":{"icon":"switch","title":"Switch 2-0 Everspring","level":"off"},"is_level_number":false,"level":0,"on_off":false}]};
  var rules = [];
  var settings = Account.getsettings();
  this.all = function() {
    console.log('getting rules infos from: ' + settings.rpiwsurl);
    var data = $http.get(settings.rpiwsurl + "/automation/rules")
      .error(function() {
          console.log('error getting rules list');
          sensors = sample.data;
      });
      // ajouter test data.status == 'ok'
    return data;
    };

    this.update = function() {
      return rules;
    };

    this.set = function(data) {
      rules = data;
    };

    this.remove = function(rule) {
      rules.splice(rules.indexOf(rule), 1);
    };

    this.get = function(id) {
      for (var i = 0; i < rules.length; i++) {
        if (rules[i].id === (id)) {
          return rules[i];
        }
      }
      return null;
    };

});
