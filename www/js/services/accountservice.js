angular.module('starter')

.service('Account', function($http) {
  var rpiws_endpoint = "http://localhost:3000";
  this.ping = function(url) {
    console.log('pinging webservice : ' + url + '/controllers/ping');
    data = $http.get(url + "/controllers/ping")
      .success(function(data) {
        if (data.status == 'ok') {
          console.log('status ok');
          return 'ok';
        }

      })
      .error(function(data) {
          console.log('error');
          return 'error'
      });

    if (data.status == 'ok') {
      console.log('status ok');
      return 'ok';
    }
    else {
      return 'error';
    }

    };

});
