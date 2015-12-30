angular.module('starter')

.controller('RulesCtrl', function($scope, Rules) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  Rules.all().success( function(response) {
    console.log('callback');
    if (response.status == 'ok'){
      $scope.rules = response.data;
      Rules.set(response.data);
    }
  });

  $scope.remove = function(rule) {
    Rules.remove(rule);
  };
})
.controller('RuleDetailCtrl', function($scope, $stateParams, Rules) {
  $scope.rule = Rules.get($stateParams.id);
});

