angular.module('domopi')

.service('Account', function($http) {

  var settings = {
    enableFriends: true,
    rpiwsurl: 'http://10.31.14.38:3000'
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

  this.getsettings = function() {
    return settings;
  };

});
