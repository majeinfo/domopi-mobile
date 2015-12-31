angular.module('domopi')

.service('Rules', function($http, $stateParams, Account, Sensors) {
  var rules = [];
  var settings = Account.getsettings();
  this.all = function() {
    console.log('getting rules infos from: ' + settings.rpiwsurl);
    var data = $http.get(settings.rpiwsurl + "/automation/rules")
      .error(function() {
          console.log('error getting rules list');
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
    this.getconditionsensor = function(devid, instid, sid) {
      return Sensors.get(devid, instid, sid);
    };

    this.remove = function(rule) {
      rules.splice(rules.indexOf(rule), 1);
    };

    this.get = function(description) {
      console.log('looking for rule: ' + description)
      for (var i = 0; i < rules.length; i++) {
        if (rules[i]['description'] === (description)) {
          return rules[i];
        }
      }
      return null;
    };

});
