angular.module('domopi')

.service('Account', function($http, localstorage) {

  var settings = {
    enableAlerts: true,
    enableHealth: true,
    enableUpcoming: true,
    rpiwsurl: 'http://localhost:3000',
    rpikey: ''
  }
  console.log('before');
  console.log(localstorage.getObject('settings'));
  if (localstorage.getObject('settings') === "{}"){
    localstorage.setObject('settings', settings)
    console.log('after');
    console.log(localstorage.getObject('settings'));

  }
  this.ping = function(url) {
    var rand = Math.floor((Math.random()*6)+1);
    console.log('pinging webservice : ' + url + '/controllers/ping/' + rand);
    var data = $http.get(url + "/controllers/ping/" + rand)
      .error(function(data) {
          console.log('error');
      });
    //console.log(data);
    return data;
    };
  this.setsettings = function() {
    console.log('update settings');
    console.log(settings);
    localstorage.setObject('settings', settings)
    console.log('update localstorage');
    console.log(localstorage.getObject('settings'));

  };
  this.getsettings = function() {
    var storedsettings = localstorage.getObject('settings')

    return (localstorage.getObject('settings') === "{}") ? storedsettings : settings;
  };

});
