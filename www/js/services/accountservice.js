angular.module('starter')

.service('Account', function($http) {

  var settings = {
    enableFriends: true,
    rpiwsurl: 'http://localhost:3000'
  }
  this.ping = function(url) {
    var rand = Math.floor((Math.random()*6)+1);
    console.log('pinging webservice : ' + url + '/controllers/ping/' + rand);
    data = $http.get(url + "/controllers/ping/" + rand)
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

  this.getsettings = function() {
    return settings;
  };

});
