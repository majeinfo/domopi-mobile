angular.module('domopi.controllers', ['chart.js'])

.controller('DashCtrl', function($scope, Account) {
  $scope.settings = Account.getsettings();
  $scope.graph = {};
  $scope.graph.data = [
    //Awake
    [16, 15, 20, 12, 16, 12, 8],
    //Asleep
    [8, 9, 4, 12, 8, 12, 14]
  ];
  $scope.graph.labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  $scope.graph.series = ['Awake', 'Asleep'];
});
