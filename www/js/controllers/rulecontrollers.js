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
    console.log('callback rule');
    console.log(response);
    if (response.status == 'ok'){
      $scope.rules = response.rules;
      Rules.set(response.rules);
    }
  });

  $scope.remove = function(rule) {
    Rules.remove(rule);
  };
})
.controller('RuleDetailCtrl', function($scope, $stateParams, Rules) {
  console.log('params: ' + $stateParams.ruleDescription);
  $scope.rule = Rules.get($stateParams.ruleDescription);
});

